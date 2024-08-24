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
import { defineComponent } from '@vue/composition-api';

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
    // 是否使用jsonform
    useForm: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleClose(){
      if (this.useForm) {
        this.broadcast('JsonForm', 'resetForm')
      }
      this.$emit('update:visible', false)
    },
    onCancel() {
      if (this.useForm) {
        this.broadcast('JsonForm', 'resetForm')
      }
      this.$emit('cancel')
    },
    onSubmit() {
      if (this.useForm) {
        this.broadcast('JsonForm', 'validate', () => {
          this.$emit('submit')
        })
      } else {
        this.$emit('submit')
      }
    },
  }
})
</script>

<style lang='scss' scoped>
.json-dialog-wrap {

}

</style>
