import { throttle } from '@/utils'

const getStoreValue = (store, paths) => {
  if (store == null) return
  if (paths.length === 0) return store

  const path = paths.shift()
  return getStoreValue(store[path], paths)
}

const setStoreValue = (store, paths, value) => {
  const path = paths.shift()
  if (paths.length === 0) {
    store[path] = value
  } else {
    setStoreValue(store[path], paths, value)
  }
}

// 从store获取数据进行初始化
function initData() {
  Object.entries(this._data.storeKeyMap).forEach(([key, pathStr]) => {
    const value = getStoreValue(this.$store.state, pathStr.split('.'))
    if (value != null) {
      this[key] = JSON.parse(JSON.stringify(value))
    }
  })
}

// 监听storeKey的变化, 更新对应的store
function initWatch() {
  Object.entries(this._data.storeKeyMap).forEach(([key, pathStr]) => {
    const handler = function(value) {
      console.log('mixin', key, 'change')
      setStoreValue(this.$store.state, pathStr.split('.'), value)
    }

    this.$watch(key, throttle(handler), { deep: true })
  })
}
const mixin = {
  created: function() {
    initWatch.call(this)
    initData.call(this)
    console.log('created')
  },
  watch: {
    '$store.state.form.id': {
      handler: function(id) {
        if (!id) return
        console.log('id watch')
        initData.call(this)
      },
      immediate: true
    },
    // for test
    '$store.state.form.info.company.name': {
      handler: function(name) {
        console.log('name', name)
      },
      immediate: true
    }
  }
}

export default mixin
