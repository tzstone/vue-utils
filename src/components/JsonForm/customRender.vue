<script lang="ts">
import { defineComponent, h, PropType } from '@vue/composition-api';
import { VNode } from 'vue';

export default defineComponent({
  name: 'CustomRender',
  props: {
    render: {
      type: Function as PropType<(h, { form }) => VNode>,
      required: true
    },
    form: {
      type: Object as PropType<{ [key: string]: any }>,
      required: true
    }
  },
  setup(props, ctx) {
    return () => {
      const vnode = props.render(h, { form: props.form })
      return h('div', [vnode])
    }
  }
})
</script>
