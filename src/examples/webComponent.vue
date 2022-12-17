<template>
  <div>
    <button class="btn" @click="onChangeColor">changeColor</button>
    <my-element class="disabled" />
  </div>
</template>

<script>
window.customElements.define(
  'my-element',
  class MyElement extends HTMLElement {
    constructor() {
      super()
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.innerHTML = `
            <style>
              .disabled {
                color: gray;
                background-color: var(--bg)
              }
              .btn {
                color: red;
              }
              .dialog{
                color: red;
              }
            </style>
            <div id="container" class="disabled">shadow dom</div>
            <button id="openbtn">open dialog</button>
          `
      this.container = shadowRoot.querySelector('#container')
      shadowRoot.querySelector('#openbtn').addEventListener('click', function () {
        const el = document.createElement('div')
        el.classList.add('dialog')
        el.innerHTML = "i'm dialog"
        // shadowRoot.appendChild(el) // dialog 类名生效
        document.body.append(el) // dialog 类名不生效
      })

      // 可修改全局变量
      window.a = 100
    }
    connectedCallback() {}

    changeColor() {
      this.container.style.color = 'yellow'
    }
  }
)
export default {
  name: '',
  data() {
    return {}
  },
  created() {},
  methods: {
    // 调用component内部方法
    onChangeColor() {
      const el = document.querySelector('my-element')
      el.changeColor()
    }
  }
}
</script>

<style lang="scss">
.disabled {
  color: red !important; // 无法覆盖component已定义的样式
  font-size: 20px; // component未定义的样式则生效
  --bg: #e0e0e0; // 通过var变量修改component内部样式
}
</style>
