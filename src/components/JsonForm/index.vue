<template>
    <el-form ref="formRef" class="json-form-wrap" :model="form" :rules="rules" label-width="auto" :inline="inline" :disabled="disabled" size="small" v-bind="$attrs" v-on="$listeners">
      <el-form-item class="prefix-form-item">
        <el-button v-for="(item, index) in (schema.prefixBtns || [])" :key="index" :icon="item.icon" @click="(e) => item.click(e)">{{ item.innerText }}</el-button>
      </el-form-item>

      <formItem v-for="(item, index) in schema.formItems" :key="index" v-model="form" :config="item" >
        <template v-if="item.type==='slot'">
          <slot :slot="item.field" :name="item.field"></slot>
        </template>
      </formItem>
     
      <el-form-item>
        <el-button v-if="schema.submitBtn" type="primary" @click="onSubmit">{{ schema.submitBtn.innerText || '查询' }}</el-button>
        <el-button v-if="schema.resetBtn" @click="onReset">{{ resetText }}</el-button>
      </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@vue/composition-api';
import { isBoolean, isPlainObject } from 'lodash-es';

import formItem from './formItem.vue';
import { Schema } from './type';
export default defineComponent({
  name: 'JsonForm',
  components: { formItem },
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
    const formRef = ref(null)
    const form = computed({
      get: () => props.value,
      set: (val) => ctx.emit('update:value', val)
    })

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
      rules,
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
}

</style>
