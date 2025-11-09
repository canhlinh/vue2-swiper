/**
 * @file vue-awesome-swiper
 * @module event
 * @author Surmon <https://github.com/surmon-china>
 */

import Swiper from 'swiper'
import { SWIPER_EVENTS, ComponentEvents } from './constants'
import { kebabcase } from './utils'

export const handleClickSlideEvent = (swiper: Swiper | null, event: MouseEvent, emit: any): void => {
  if (swiper && !((swiper as any).destroyed)) {
    const eventPath = (event.composedPath?.() || (event as any).path) as EventTarget[] | undefined
    const target = event.target as HTMLElement | null
    if (target && eventPath) {
      const slides: HTMLElement[] = Array.from(swiper.slides) as HTMLElement[]
      const paths = Array.from(eventPath) as HTMLElement[]
      // Click slide || slide[children]
      if (slides.includes(target) || paths.some(item => slides.includes(item))) {
        const clickedIndex = (swiper as any).clickedIndex
        const reallyIndex = Number((swiper as any).clickedSlide?.dataset?.swiperSlideIndex)
        const reallyIndexValue = Number.isInteger(reallyIndex) ? reallyIndex : null
        emit(ComponentEvents.ClickSlide, clickedIndex, reallyIndexValue)
        emit(kebabcase(ComponentEvents.ClickSlide), clickedIndex, reallyIndexValue)
      }
    }
  }
}

export const bindSwiperEvents = (swiper: Swiper, emit: any): void => {
  SWIPER_EVENTS.forEach(eventName => {
    // Cast to any to avoid strict typing mismatch between our string list and SwiperEvents keys
    (swiper as any).on(eventName, (...args: any[]) => {
      emit(eventName, ...args)
      const kebabcaseName = kebabcase(eventName)
      if (kebabcaseName !== eventName) {
        emit(kebabcaseName, ...args)
      }
    })
  })
}
