<template>
  <div>
    <button @click="onSnapshot">截图</button>&nbsp;
    <button @click="onAddFont">加载字体</button>
    <div id="snapshot">DINCondensedC字体: <span style="font-family: DINCondensedC">Top1</span></div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import { importAll } from '@/utils'

export default {
  name: '',
  data() {
    return {}
  },
  methods: {
    onSnapshot() {
      html2canvas(document.querySelector('#snapshot'), {
        onclone: async function (documentClone, referenceElement) {
          document.fonts.forEach(font => {
            documentClone.fonts.add(font)
          })
          await documentClone.fonts.ready
        }
      }).then(function (canvas) {
        const img = document.createElement('a')
        img.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream')
        img.download = 'snapshot.jpg'
        img.click()
      })
    },
    onAddFont() {
      console.log(document.fonts.ready)
      const fonts = importAll(require.context('../../public/font/', false, /\.ttf$/))
      fonts.forEach(path => {
        const name = path.split('/').pop().split('.')[0]
        const font = new FontFace(name, `url(${path})`)
        document.fonts.add(font)
      })
      console.log(document.fonts.ready)
    }
  }
}
</script>

<style lang="scss" scoped>
#snapshot {
  height: 50px;
}
</style>
