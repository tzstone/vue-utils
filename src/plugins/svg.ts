// svg引入
import { importAll } from '@/utils'

importAll(require.context('@/assets/svg/', false, /\.svg$/))
