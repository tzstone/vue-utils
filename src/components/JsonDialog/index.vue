<template>
  <el-dialog
    title="提示"
    class="json-dialog-wrap"
    :visible.sync="visible"
    width="600px"
    :before-close="handleClose">
    <!-- eslint-disable-next-line vue/no-mutating-props -->
    <JsonForm ref="form" v-model="form" :schema="schema"/>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';

import JsonForm from '../JsonForm/index.vue';
import { Schema } from '../JsonForm/type';

export default defineComponent({
  name: 'JsonDialog',
  components: { JsonForm },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object as PropType<{ [key: string]: any }>,
      default: () => {}
    },
    schema: {
      type: Object as PropType<Schema>,
    },
  },
  data () {
    return {
    }
  },
  methods: {
    handleClose(){
      this.$emit('update:visible', false)
    },
    onCancel() {
      this.$refs['form'].resetForm()
      this.$emit('cancel')
    },
    onSubmit() {
      this.$refs['form'].validate(() => {
        this.$emit('submit')
      })
    }
  }
})
</script>

<style lang='scss' scoped>
.json-dialog-wrap {

}

</style>
