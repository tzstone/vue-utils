<template>
  <el-dialog
    title="提示"
    class="json-dialog-wrap"
    :visible.sync="visible"
    width="600px"
    :before-close="handleClose">
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
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
  },
  setup(props, ctx) {
    const { proxy } = getCurrentInstance()
    const useForm = ref(false)
    const handleClose = () => {
      if (useForm.value) {
        (proxy as any).broadcast('JsonForm', 'resetForm')
      }
      ctx.emit('update:visible', false)
    }

    const onCancel = () => {
      if (useForm.value) {
        (proxy as any).broadcast('JsonForm', 'resetForm')
      }
      ctx.emit('cancel')
    }

    const onSubmit = () => {
      if (useForm.value) {
        (proxy as any).broadcast('JsonForm', 'validate', () => {
          ctx.emit('submit')
        })
      } else {
        ctx.emit('submit')
      }
    }

    provide('inDialog', true)
    provide('setUseForm', (use) => useForm.value = use)

    return {
      handleClose,
      onCancel,
      onSubmit
    }
  }
})
</script>

<style lang='scss' scoped>
.json-dialog-wrap {

}

</style>
