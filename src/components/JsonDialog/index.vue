<template>
  <el-dialog
    title="提示"
    class="json-dialog-wrap"
    :visible.sync="visible"
    width="600px"
    v-bind="$attrs"
    :before-close="handleClose">
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button :loading="loading" type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, provide, ref } from '@vue/composition-api';

import emitter from '@/mixins/emitter';

export default defineComponent({
  name: 'JsonDialog',
  components: {
  },
  mixins: [emitter],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    submit: {
      type: Function,
      default: null
    }
  },
  setup(props, ctx) {
    const { proxy } = getCurrentInstance()
    const useForm = ref(false)
    const loading = ref(false)
    const handleClose = () => {
      if (useForm.value) {
        (proxy as any).broadcast('JsonForm', 'clearForm')
      }
      ctx.emit('close')
      ctx.emit('update:visible', false)
    }

    const onCancel = () => {
      if (useForm.value) {
        (proxy as any).broadcast('JsonForm', 'clearForm')
      }
      ctx.emit('cancel')
    }

    const _submit = async () => {
      if (props.submit) {
        loading.value = true
        try {
          await props.submit()
          ctx.emit('update:visible', false)
        } finally {
          loading.value = false
        }
      }else {
        ctx.emit('submit')
      }
    }

    const onSubmit = () => {
      if (useForm.value) {
        (proxy as any).broadcast('JsonForm', 'validate', () => {
          _submit()
        })
      } else {
        _submit()
      }
    }


    provide('inDialog', true)
    provide('setUseForm', (use) => useForm.value = use)

    return {
      handleClose,
      onCancel,
      onSubmit,
      loading
    }
  }
})
</script>

<style lang='scss' scoped>
.json-dialog-wrap {

}

</style>
