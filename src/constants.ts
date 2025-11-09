/**
 * @file vue-awesome-swiper
 * @module constants
 * @author Surmon <https://github.com/surmon-china>
 */
// Note: Swiper v12 does not export a string union for event names; we keep events as string literals.

export enum CoreNames {
  SwiperComponent = 'Swiper',
  SwiperSlideComponent = 'SwiperSlide',
  SwiperDirective = 'swiper',
  SwiperInstance = '$swiper'
}

export const DEFAULT_CLASSES = Object.freeze({
  // Swiper >=6 uses `swiper` as root class (previously `swiper-container` in v5)
  // We switch to the new class for style compatibility with v12.
  containerClass: 'swiper',
  wrapperClass: 'swiper-wrapper',
  slideClass: 'swiper-slide'
})
export type SwiperClassKey = keyof typeof DEFAULT_CLASSES

export enum ComponentEvents {
  Ready = 'ready',
  ClickSlide = 'clickSlide',
}

export enum ComponentPropNames {
  AutoUpdate = 'autoUpdate',
  AutoDestroy = 'autoDestroy',
  DeleteInstanceOnDestroy = 'deleteInstanceOnDestroy',
  CleanupStylesOnDestroy = 'cleanupStylesOnDestroy'
}

// https://swiperjs.com/api/#events
export const SWIPER_EVENTS: string[] = [
  'init',
  'beforeDestroy',
  'slideChange',
  'slideChangeTransitionStart',
  'slideChangeTransitionEnd',
  'slideNextTransitionStart',
  'slideNextTransitionEnd',
  'slidePrevTransitionStart',
  'slidePrevTransitionEnd',
  'transitionStart',
  'transitionEnd',
  'touchStart',
  'touchMove',
  'touchMoveOpposite',
  'sliderMove',
  'touchEnd',
  'click',
  'tap',
  'doubleTap',
  'imagesReady',
  'progress',
  'reachBeginning',
  'reachEnd',
  'fromEdge',
  'setTranslate',
  'setTransition',
  'resize',
  'observerUpdate',
  'beforeLoopFix',
  'loopFix'
]
