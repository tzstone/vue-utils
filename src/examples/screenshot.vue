<template>
  <div>
    <div @click="download">download</div>
    <div class="wrapper">
      <div class="box"></div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  name: '',
  data() {
    return {}
  },
  methods: {
    download() {
      // const scale = 0.05
      const el = document.querySelector('.box')
      const scaleSelector = '.wrapper'
      // const { width, height } = el.getBoundingClientRect()
      html2canvas(el, {
        // width: width / scale,
        // height: height / scale,
        // scale: 1 / scale,
        onclone: (document, element) => {
          document.querySelector(scaleSelector).style.transform = `scale(${1})`
          // element.style.transform = `scale(${1})`
        }
      }).then(canvas => {
        var MIME_TYPE = 'image/png'
        var imgURL = canvas.toDataURL(MIME_TYPE)
        var dlLink = document.createElement('a')
        dlLink.download = 'bg'
        dlLink.href = imgURL
        // dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')
        document.body.appendChild(dlLink)
        dlLink.click()
        document.body.removeChild(dlLink)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  transform: scale(0.05);
}
.box {
  width: 1500px;
  height: 600px;
  background: url('../assets/bg.jpg');
}
</style>
