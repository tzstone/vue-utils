export default {
  install(Vue, options) {
    const eventBus = new Vue()

    const $off = eventBus.$off.bind(eventBus)
    const $emit = eventBus.$emit.bind(eventBus)
    const $once = eventBus.$once.bind(eventBus)
    const $on = function (event, callback) {
      if (!this._event_bus_map_) {
        // event可为数组
        this._event_bus_map_ = new Map()

        // 调用destroyed钩子后才会调用vm.$off()
        this.$once('hook:destroyed', () => {
          this._event_bus_map_.forEach((callback, event) => {
            if (callback && event) $off(event, callback)
          })
          this._event_bus_map_ = null
        })
      }

      this._event_bus_map_.set(event, callback)

      eventBus.$on(event, callback)
    }

    Object.defineProperty(Vue.prototype, '$eventBus', {
      get() {
        return {
          $on: $on.bind(this),
          $off,
          $emit,
          $once
        }
      }
    })
  }
}
