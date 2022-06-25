import mitt, { Emitter } from 'mitt'

export const enum EmitterEvents {
  CLICK_OUTSIDE = 'CLICK_OUTSIDE'
}

type Events = {
  [EmitterEvents.CLICK_OUTSIDE]: any
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
