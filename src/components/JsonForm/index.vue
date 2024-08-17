<template>
    <el-form ref="formRef" class="json-form-wrap" :model="form" :rules="rules" label-width="auto" :inline="inline" :disabled="disabled" size="small" v-bind="$attrs" v-on="$listeners">
      <el-form-item class="prefix-form-item">
        <el-button v-for="(item, index) in (schema.prefixBtns || [])" :key="index" :icon="item.icon" @click="(e) => item.click(e)">{{ item.innerText }}</el-button>
      </el-form-item>
      <el-form-item v-for="(item, index) in formItems" :key="index" :label="item.label" :prop="item.field">
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
          <el-checkbox v-model="form[item.field]" :class="item.class" :style="item.style" v-bind="item.props" v-on="item.on">{{ optionsMap[item.field] ? optionsMap[item.field][0].label : '' }}</el-checkbox>
        </template>
        <!-- checkbox-group -->
        <template v-else-if="item.type==='checkbox-group'">
          <el-checkbox-group v-model="form[item.field]" :class="item.class" :style="item.style" v-bind="item.props" v-on="item.on">
            <el-checkbox v-for="(t, i) in optionsMap[item.field]" :key="i" :label="t.value">{{ t.label }}</el-checkbox>
          </el-checkbox-group>
        </template>
        <!-- slot -->
        <template v-else-if="item.type==='slot'">
          <slot :name="item.field"></slot>
        </template>
        <component :is="item.component" v-else v-model="form[item.field]" :class="item.class" :style="item.style" v-bind="item.props" v-on="item.on" />
      </el-form-item>
      <el-form-item>
        <el-button v-if="schema.submitBtn" type="primary" @click="onSubmit">{{ schema.submitBtn.innerText || '查询' }}</el-button>
        <el-button v-if="schema.resetBtn" @click="onReset">{{ resetText }}</el-button>
      </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref, watch } from '@vue/composition-api';
import { isBoolean, isPlainObject } from 'lodash-es';

import { defElementConfig } from './config';
import { FormItem, Schema } from './type';
export default defineComponent({
  name: 'JsonForm',
  props: {
    value: {
      type: Object as PropType<{ [key: string]: any }>,
      default: () => {}
    },
    schema: {
      type: Object as PropType<Schema>,
    },
    inline: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const optionsMap = reactive({})
    const formRef = ref(null)
    const form = computed({
      get: () => props.value,
      set: (val) => ctx.emit('update:value', val)
    })

    const getFormItem = (config: FormItem) => {
      const item = { ...config }
      const defConfig = defElementConfig[item.type] || {}
      // @ts-ignore
      item.component = defConfig.component

      item.props = Object.assign({}, defConfig.props || {}, item.props || {})
      if (item.runtimeProps) {
        watch(() => item.runtimeProps(form.value), () => {
          item.props = Object.assign(item.props, (item.runtimeProps(form.value) || {}))
        }, {
          immediate: true
        })
      }

      if (item.options) {
        optionsMap[item.field] = Object.freeze(item.options)
        delete item.options
      }
      if (item.runtimeOptions) {
        watch(() => item.runtimeOptions(form.value), async () => {
          const options = await item.runtimeOptions(form.value)
          ctx.root.$set(optionsMap, item.field, Object.freeze(options))
        }, { immediate: true })
      }

      item.optionKey = Object.assign({ label: 'label', value: 'value' }, item.optionKey || {})

      return item
    }

    const formItems = props.schema.formItems.map(item => getFormItem(item))

    const rules = props.schema.formItems.reduce((result, item) => {
      if (!item.field) return result

      item.rules && (result[item.field] = item.rules)

      if (item.required && !result[item.field]) {
        result[item.field] = [{ required: true, trigger: 'change' }]
      }

      return result
    }, {})

    const onSubmit = (e) => {
      if (props.schema.submitBtn?.click) {
        props.schema.submitBtn.click(e)
      }
    }

    const onReset = (e) => {
      formRef.resetFields()

      // @ts-ignore
      if (typeof props.schema.resetBtn?.click === 'function') {
        // @ts-ignore
        props.schema.resetBtn.click(e)
      }
    }

    const resetText = computed(() => {
      if (isBoolean(props.schema.resetBtn)) return '重置'
      // @ts-ignore
      else if (isPlainObject(props.schema.resetBtn)) return props.schema.resetBtn.innerText || '重置'
      return ''
    })

    return { 
      formRef,
      form,
      formItems,
      rules,
      optionsMap,
      onSubmit,
      onReset,
      resetText
    }
  }
})
</script>

<style lang='scss' scoped>
.json-form-wrap {
  .prefix-form-item {
    margin-right: 0;
    .el-button:last-child{
      margin-right: 20px;
    }
  }
  ::v-deep {
    .el-select, .el-date-editor{
      width: 100%;
    }
  }
}

</style>
