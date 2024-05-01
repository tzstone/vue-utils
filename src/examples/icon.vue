<template>
  <div>
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="iconname" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  data() {
    return {}
  },
  computed: {
    iconname() {
      return '#icon-email'
    }
  },
  methods: {}
}
</script>

<style type="text/css">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
