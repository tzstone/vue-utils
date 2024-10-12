import { cloneDeep } from 'lodash-es';
import Vue from 'vue';

import JsonDialog from '@/components/JsonDialog/index.vue';
import JsonForm, { Schema } from '@/components/JsonForm';
import { getVueOptions } from '@/utils/vue';

export function showDialog(options: { title: string; schema: Schema; form , onConfirm: (form) => Promise<any>, onClose?: (action: 'close' | 'cancel') => void}) {
  const instanceOption = getVueOptions();

  let instance = new Vue({
    ...instanceOption,
    el: document.createElement('div'),
    data(){
      return {
        visible: false,
        form: cloneDeep(options.form) // 不影响原有的form对象
      }
    },
    render: function(h) {
      const dialogAttrs = {
        attrs: {
          visible: this.visible,
          submit: async () => {
            await options.onConfirm(this.form)
            this.visible = false
          },
        },
        on: {
          'update:visible': (visible) => this.visible = visible,
          cancel: () => {
            options.onClose('cancel');
            close()
          },
          close: () => {
            options.onClose('close')
            close()
          }
        }
      }
      return (
        <JsonDialog {...dialogAttrs} >
          <JsonForm vModel={this.form} schema={options.schema}></JsonForm>
        </JsonDialog>
      )
    },
  });

  document.body.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.visible = true
  })

  let close = () => {
    instance.visible = false
    Vue.nextTick(() => {
      instance.$destroy()
      document.body.removeChild(instance.$el);
      instance = null
      close = null
    })
  }

  return {
    close
  }
}
