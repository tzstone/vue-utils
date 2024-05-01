<template>
  <div>
    <grandparent>
      <parent>
        <child />
      </parent>
    </grandparent>

    <grandparent>
      <child />
    </grandparent>
  </div>
</template>

<script>
import grandparent from '@/components/grandparent.vue'
import parent from '@/components/parent.vue'
import child from '@/components/child.vue'

export default {
  name: '',
  components: {
    grandparent,
    parent,
    child
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped></style>
