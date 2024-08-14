<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" inline size="small" v-bind="$attrs" v-on="$listeners">
    <el-form-item v-for="(item, index) in formItems" :key="index" :label="item.label" :prop="item.field">
      <el-select v-if="item.type==='select'" v-model="form[item.field]" :class="item.class" :style="item.style" v-bind="item.props" v-on="item.on" >
        <el-option
          v-for="t in optionsMap[item.field]"
          :key="t[item.optionKey.value]"
          :label="t[item.optionKey.label]"
          :value="t[item.optionKey.value]"/>
      </el-select>
      <template v-else-if="item.type==='slot'">
        <slot :name="item.field"></slot>
      </template>
      <component :is="item.component" v-else v-model="form[item.field]" :class="item.class" :style="item.style" v-on="item.on" />
    </el-form-item>
    <el-form-item>
      <el-button v-if="schema.submitBtn" @click="onSubmit">{{ schema.submitBtn.innerText || '查询' }}</el-button>
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
      const defConfig = defElementConfig[item.type]
      // @ts-ignore
      item.component = defConfig.component

      item.props = Object.assign({}, defConfig.props||{}, item.props)
      if (item.runtimeProps) {
        watch(() => item.runtimeProps(form.value), () => {
          // TODO:
          item.props = Object.assign(item.props, (item.runtimeProps(form.value) || {}))
        }, {
          immediate: true
        })
      }

      if (item.options) {
        optionsMap[item.field] = item.options
        delete item.options
      }
      if (item.runtimeOptions) {
        watch(() => item.runtimeOptions(form.value), async () => {
          ctx.root.$set(optionsMap, item.field, await item.runtimeOptions(form.value))
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

<style lang='less' scoped>

</style>
