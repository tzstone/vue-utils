// svg引入
import { importAll } from '@/utils'

const fonts = importAll(require.context('../../public/fonts/', false, /\.ttf$/))
fonts.forEach(path => {
  const name = path.split('/').pop().split('.')[0]
  const font = new FontFace(name, `url(${path})`)
  document.fonts.add(font)
})
