// fork自https://github.com/maoberlehner/vuex-map-fields
import { isObject } from './lang'

function arrayToObject(fields = []) {
  return fields.reduce((prev, path) => {
    const key = path.split(`.`).slice(-1)[0]

    if (prev[key]) {
      throw new Error(`The key \`${key}\` is already in use.`)
    }

    // eslint-disable-next-line no-param-reassign
    prev[key] = path

    return prev
  }, {})
}

function normalizeNamespace(fn) {
  return (...params) => {
    // eslint-disable-next-line prefer-const
    let [namespace, map, getterType, mutationType] = typeof params[0] === `string`
      ? [...params]
      : [``, ...params]

    if (namespace.length && namespace.charAt(namespace.length - 1) !== `/`) {
      namespace += `/`
    }

    getterType = `${namespace}${getterType || `getField`}`
    mutationType = `${namespace}${mutationType || `updateField`}`

    return fn(namespace, map, getterType, mutationType)
  }
}

export function getField(state) {
  return path => path.split(/[.[\]]+/).reduce((prev, key) => prev[key], state)
}

export function updateField(state, { path, value }) {
  path.split(/[.[\]]+/).reduce((prev, key, index, array) => {
    if (array.length === index + 1) {
      // eslint-disable-next-line no-param-reassign
      prev[key] = value
    }

    return prev[key]
  }, state)
}

export const mapFields = normalizeNamespace((namespace, fields, getterType, mutationType) => {
  const fieldsObject = Array.isArray(fields) ? arrayToObject(fields) : fields
  return Object.keys(fieldsObject).reduce((prev, key) => {
    const path = fieldsObject[key]
    const field = {
      _unwatch: null,
      get() {
        const store = this.$store
        const value = store.getters[getterType](path)
        if (isObject(value) && !field._unwatch) {
          // $nextTick里watch: 避免被当成依赖收集
          this.$nextTick(() => {
            field._unwatch = this.$watch(key, function(val) {
              store.commit(mutationType, { path, value: val })
            }, { deep: true })
          })
        }

        return value
      },
      set(value) {
        // 新引用, 销毁原watch
        if (field._unwatch) {
          field._unwatch()
          field._unwatch = null
        }
        this.$store.commit(mutationType, { path, value })
      }
    }

    // eslint-disable-next-line no-param-reassign
    prev[key] = field

    return prev
  }, {})
})

export const createHelpers = ({ getterType, mutationType }) => ({
  [getterType]: getField,
  [mutationType]: updateField,
  mapFields: normalizeNamespace((namespace, fields) => mapFields(
    namespace,
    fields,
    getterType,
    mutationType
  ))
})
