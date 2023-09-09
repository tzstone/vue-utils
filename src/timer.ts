export default {
  install(Vue) {
    const getTimerIds = function () {
      return this._cache_timer_ids_
    }

    // 调用destroyed钩子后才会调用vm.$off()
    const addTimerId = function (id) {
      if (!this._cache_timer_ids_) {
        this._cache_timer_ids_ = [id]
        this.$once('hook:beforeDestroy', () => {
          this._cache_timer_ids_.forEach(id => {
            clearTimeout(id)
            clearInterval(id)
          })
          this._cache_timer_ids_ = null
        })
      } else {
        this._cache_timer_ids_.push(id)
      }
    }

    Object.defineProperty(Vue.prototype, '$timer', {
      get: getTimerIds.bind(this),
      set: addTimerId.bind(this)
    })
  }
}
