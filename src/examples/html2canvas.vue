<template>
  <div>
    <button @click="onSnapshotHtml2canvas">截图 html2canvas</button>&nbsp;
    <button @click="onSnapshotHtml2Image">截图 html2image</button>&nbsp;
    <button @click="onAddFont">加载字体</button>
    <div id="snapshot">
      <div>
        DINCondensedC字体:
        <span style="font-family: DINCondensedC; font-feature-settings: liga 0">Top1</span>
      </div>
      <div>
        FZZhunYuan字体:
        <span style="font-family: FZZhunYuan">Top2</span>
      </div>
      <div>
        FZCuYuan字体:
        <span style="font-family: FZCuYuan">Top3</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as htmlToImage from 'html-to-image'
import html2canvas from 'html2canvas'

import { importAll } from '@/utils'

export default {
  name: '',
  data() {
    return {}
  },
  methods: {
    onSnapshotHtml2canvas() {
      html2canvas(document.querySelector('#snapshot'), {
        // foreignObjectRendering: true,
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
    async onSnapshotHtml2Image() {
      htmlToImage.toCanvas(document.querySelector('#snapshot')).then(function (canvas) {
        const img = document.createElement('a')
        img.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream')
        img.download = 'snapshot.jpg'
        img.click()
      })
    },
    onAddFont() {
      console.log(document.fonts.ready)
      const fonts = importAll(require.context('../../public/fonts/', false, /\.ttf$/))
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
