<template>
    <el-form-item v-if="item.display" :label="item.label" :prop="item.field">
        <!-- select -->
        <template v-if="item.type==='select'">
          <el-select v-model="form[item.field]" :class="item.class" :style="item.style" v-bind="item.props" v-on="item.on" >
            <el-option
              v-for="(t, i) in optionsMap[item.field]"
              :key="i"
              :label="t[item.optionKey.label]"
              :value="t[item.optionKey.value]"/>
          </el-select>
        </template>
        <!-- checkbox -->
        <template v-else-if="item.type==='checkbox'">
          <el-checkbox v-model="form[item.field]" :class="item.class" :style="item.style" v-bind="item.props" v-on="item.on">{{ item.innerText }}</el-checkbox>
        </template>
        <!-- checkbox-group -->
        <template v-else-if="item.type==='checkboxGroup'">
          <el-checkbox-group v-model="form[item.field]" :class="item.class" :style="item.style" v-bind="item.props" v-on="item.on">
            <el-checkbox v-for="(t, i) in optionsMap[item.field]" :key="i" :label="t[item.optionKey.value]">{{ t[item.optionKey.label] }}</el-checkbox>
          </el-checkbox-group>
        </template>
         <!-- upload -->
         <template v-else-if="item.type==='upload'">
          <el-upload :class="item.class" :style="item.style" v-bind="item.props" v-on="item.on">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </template>
        <!-- slot -->
        <template v-else-if="item.type==='slot'">
          <slot :name="item.field"></slot>
        </template>
        <component :is="item.component" v-else v-model="form[item.field]" :class="item.class" :style="item.style" v-bind="item.props" v-on="item.on" />
    </el-form-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, watch } from '@vue/composition-api';
import { isFunction } from 'lodash-es';

import { getElementConfig } from './config';
import { FormItem, RenderFormItem, RuntimeOptions, RuntimeShow } from './type';

export default defineComponent({
  name: 'FormItem',
  props: {
    config: {
      type: Object as PropType<FormItem>,
      default: () => {}
    },
    value: {
      type: Object as PropType<{ [key: string]: any }>,
      default: () => {}
    },
  },
  setup(props, ctx) {
    const optionsMap = reactive({})

    const form = computed({
      get: () => props.value,
      set: (val) => ctx.emit('update:value', val)
    })

    const item: RenderFormItem = reactive({ ...props.config })
    const { component, runtimeProps, props: defProps } = getElementConfig(item) || {}
    
    item.component = component
    item.runtimeProps = runtimeProps
    // 添加响应式
    ctx.root.$set(item, 'props', defProps)

    if (item.runtimeProps) {
      watch(() => item.runtimeProps(form.value), () => {
        item.props = Object.assign({}, item.props, (item.runtimeProps(form.value) || {}))
      }, {
        immediate: true
      })
    }

    if (Array.isArray(item.options)) {
      optionsMap[item.field] = Object.freeze(item.options)
      delete item.options
    } else if (isFunction(item.options)) {
      watch(() => (item.options as RuntimeOptions)(form.value), async () => {
        const options = await (item.options as RuntimeOptions)(form.value)
        ctx.root.$set(optionsMap, item.field, Object.freeze(options))
      }, { immediate: true })
    }

    item.optionKey = Object.assign({ label: 'label', value: 'value' }, item.optionKey || {})
    
    // 添加响应式
    ctx.root.$set(item, 'display', true)
    if (('show' in item) && !isFunction(item.show)) {
      item.display = !!item.show
    } else if (isFunction(item.show)) {
      watch(() => (item.show as RuntimeShow)(form.value), (show) => {
        item.display = !!show
      }, { immediate: true })
    }

    return {
      form,
      item,
      optionsMap
    }
  }
})
</script>

<style lang='scss' scoped>
  ::v-deep {
    .el-select, .el-date-editor{
      width: 100%;
    }
    .el-form-item__content {
      .el-upload-list__item {
        width: 40px;
        height: 40px;
        display: inline-flex;
        .el-icon-delete {
          font-size: 14px;
        }
        .el-upload-list__item-status-label{
          display: none;
        }
      }
      .el-upload__tip {
        margin-top: 5px;
        line-height: 1;
      }
      .el-upload {
        height: 32px;
        width: unset;
        line-height: unset;
        border: none;
      }
    }
    
  }
</style>
