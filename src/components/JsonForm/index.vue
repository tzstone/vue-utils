<template>
  <el-form ref="formRef" class="json-form-wrap" :model="form" label-width="auto" :inline="inline" :disabled="disabled" size="small" v-bind="$attrs" v-on="$listeners">
    <el-form-item class="prefix-form-item">
      <el-button v-for="(item, index) in (schema.prefixBtns || [])" :key="index" :icon="item.icon" @click="(e) => item.click(e)">{{ item.innerText }}</el-button>
    </el-form-item>

    <template v-if="isMultiColumn">
      <el-row v-for="(row, i) in rows" :key="i" :gutter="20">
        <el-col v-for="(item, index) in row" :key="index" :span="item.col.span">
          <formItem :key="index" v-model="form" :config="item" >
            <template v-if="item.type==='slot'">
              <slot :slot="item.field" :name="item.field"></slot>
            </template>
          </formItem>
        </el-col>
      </el-row>
    </template>
    <template v-else>
      <formItem v-for="(item, index) in schema.formItems" :key="index" v-model="form" :config="item" >
        <template v-if="item.type==='slot'">
          <slot :slot="item.field" :name="item.field"></slot>
        </template>
      </formItem>
    </template>

    <el-form-item v-if="schema.submitBtn || schema.resetBtn">
      <el-button v-if="schema.submitBtn" type="primary" @click="onSubmit">{{ schema.submitBtn.innerText || '查询' }}</el-button>
      <el-button v-if="schema.resetBtn" @click="onReset">{{ resetText }}</el-button>
    </el-form-item>

  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, onUnmounted, PropType, ref } from '@vue/composition-api';
import { isBoolean, isPlainObject, sumBy } from 'lodash-es';

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

    const isMultiColumn = props.schema.formItems.some(item => item.col)
    let rows = ref([])
    // row group
    if (isMultiColumn) {
      rows.value = props.schema.formItems.reduce((result, item) => {
        if (!item.col?.span) throw new Error('必须配置col.span')

        let lastRow = result.pop()
        if (!lastRow) lastRow = []
        const sumSpan = sumBy(lastRow, (t) => t.col.span)

        if (sumSpan + item.col.span <= 24) {
          lastRow.push(item)
          result.push(lastRow)
        } else {
          result.push(lastRow)
          result.push([item])
        }
        return result
      }, [])
    }

    const onSubmit = (e) => {
      validate(() => {
        if (props.schema.submitBtn?.click) {
          props.schema.submitBtn.click(e)
        }
      })
    }

    const onReset = (e) => {
      resetForm()

      // @ts-ignore
      if (typeof props.schema.resetBtn?.click === 'function') {
        // @ts-ignore
        props.schema.resetBtn.click(e)
      }
    }

    const resetForm = () => {
      formRef.value.resetFields()
    }

    const validate = (callback) => {
      formRef.value.validate((valid) => {
        if (valid) {
          callback?.()
        }
      })
    }

    const resetText = computed(() => {
      if (isBoolean(props.schema.resetBtn)) return '重置'
      // @ts-ignore
      else if (isPlainObject(props.schema.resetBtn)) return props.schema.resetBtn.innerText || '重置'
      return ''
    })

    const { proxy } = getCurrentInstance()
    onMounted(() => {
      proxy.$on('resetForm', resetForm)
      proxy.$on('validate', validate)
    })

    onUnmounted(() => {
      proxy.$off('resetForm', resetForm)
      proxy.$off('validate', validate)
    })

    return {
      formRef,
      form,
      rows,
      onSubmit,
      onReset,
      resetText,
      isMultiColumn,
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
