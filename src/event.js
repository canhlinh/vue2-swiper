/**
 * @file vue-awesome-swiper
 * @module event
 * @author Surmon <https://github.com/surmon-china>
 */
import { __spreadArray } from "tslib";
import { SWIPER_EVENTS, ComponentEvents } from './constants';
import { kebabcase } from './utils';
export var handleClickSlideEvent = function (swiper, event, emit) {
    var _a, _b, _c;
    if (swiper && !(swiper.destroyed)) {
        var eventPath = (((_a = event.composedPath) === null || _a === void 0 ? void 0 : _a.call(event)) || event.path);
        var target = event.target;
        if (target && eventPath) {
            var slides_1 = Array.from(swiper.slides);
            var paths = Array.from(eventPath);
            // Click slide || slide[children]
            if (slides_1.includes(target) || paths.some(function (item) { return slides_1.includes(item); })) {
                var clickedIndex = swiper.clickedIndex;
                var reallyIndex = Number((_c = (_b = swiper.clickedSlide) === null || _b === void 0 ? void 0 : _b.dataset) === null || _c === void 0 ? void 0 : _c.swiperSlideIndex);
                var reallyIndexValue = Number.isInteger(reallyIndex) ? reallyIndex : null;
                emit(ComponentEvents.ClickSlide, clickedIndex, reallyIndexValue);
                emit(kebabcase(ComponentEvents.ClickSlide), clickedIndex, reallyIndexValue);
            }
        }
    }
};
export var bindSwiperEvents = function (swiper, emit) {
    SWIPER_EVENTS.forEach(function (eventName) {
        // Cast to any to avoid strict typing mismatch between our string list and SwiperEvents keys
        swiper.on(eventName, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            emit.apply(void 0, __spreadArray([eventName], args, false));
            var kebabcaseName = kebabcase(eventName);
            if (kebabcaseName !== eventName) {
                emit.apply(void 0, __spreadArray([kebabcaseName], args, false));
            }
        });
    });
};
//# sourceMappingURL=event.js.map