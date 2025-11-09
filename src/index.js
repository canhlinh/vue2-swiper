/**
 * @file vue-awesome-swiper
 * @module default-export
 * @author Surmon <https://github.com/surmon-china>
 */
// Swiper v12 provides tree-shakeable modules; default export remains main class
import SwiperClass from 'swiper';
import exporter from './exporter';
var VueAwesomeSwiper = exporter(SwiperClass);
export var version = VueAwesomeSwiper.version;
export var install = VueAwesomeSwiper.install;
export var directive = VueAwesomeSwiper.directive;
export var Swiper = VueAwesomeSwiper.Swiper;
export var SwiperSlide = VueAwesomeSwiper.SwiperSlide;
export default VueAwesomeSwiper;
//# sourceMappingURL=index.js.map