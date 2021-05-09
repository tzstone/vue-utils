const mixin = {
  created: function() {
    console.log('i am mixin')
  }
}

export default {
  vueInstanceOption: {
    mixin
  }
}
