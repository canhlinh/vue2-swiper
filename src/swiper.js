/**
 * @file vue-awesome-swiper
 * @module SwiperComponent
 * @author Surmon <https://github.com/surmon-china>
 */
import Vue from 'vue';
// Import commonly used modules (Swiper >= v6). Suppress type errors if legacy types still installed.
// @ts-ignore
import { Navigation, Pagination, Scrollbar, Parallax } from 'swiper/modules';
import { DEFAULT_CLASSES, CoreNames, ComponentPropNames, ComponentEvents } from './constants';
import { handleClickSlideEvent, bindSwiperEvents } from './event';
var SlotNames;
(function (SlotNames) {
    SlotNames["ParallaxBg"] = "parallax-bg";
    SlotNames["Pagination"] = "pagination";
    SlotNames["Scrollbar"] = "scrollbar";
    SlotNames["PrevButton"] = "button-prev";
    SlotNames["NextButton"] = "button-next";
})(SlotNames || (SlotNames = {}));
export default function getSwiperComponent(SwiperClass) {
    var _a;
    return Vue.extend({
        name: CoreNames.SwiperComponent,
        props: (_a = {
                defaultOptions: {
                    type: Object,
                    required: false,
                    default: function () { return ({}); }
                },
                // eslint-disable-next-line vue/require-default-prop
                options: {
                    type: Object,
                    required: false
                }
            },
            _a[ComponentPropNames.AutoUpdate] = {
                type: Boolean,
                default: true
            },
            // https://github.com/surmon-china/vue-awesome-swiper/pull/550/files
            _a[ComponentPropNames.AutoDestroy] = {
                type: Boolean,
                default: true
            },
            // https://github.com/surmon-china/vue-awesome-swiper/pull/388
            _a[ComponentPropNames.DeleteInstanceOnDestroy] = {
                type: Boolean,
                required: false,
                default: true
            },
            _a[ComponentPropNames.CleanupStylesOnDestroy] = {
                type: Boolean,
                required: false,
                default: true
            },
            _a),
        data: function () {
            var _a;
            return _a = {},
                _a[CoreNames.SwiperInstance] = null,
                _a;
        },
        computed: {
            swiperInstance: {
                cache: false,
                set: function (swiper) {
                    this[CoreNames.SwiperInstance] = swiper;
                },
                get: function () {
                    return this[CoreNames.SwiperInstance];
                }
            },
            swiperOptions: function () {
                return this.options || this.defaultOptions;
            },
            wrapperClass: function () {
                return this.swiperOptions.wrapperClass || DEFAULT_CLASSES.wrapperClass;
            }
        },
        methods: {
            // Feature: click event
            handleSwiperClick: function (event) {
                handleClickSlideEvent(this.swiperInstance, event, this.$emit.bind(this));
            },
            autoReLoopSwiper: function () {
                var _a, _b;
                if (this.swiperInstance && this.swiperOptions.loop) {
                    // https://github.com/surmon-china/vue-awesome-swiper/issues/593
                    // https://github.com/surmon-china/vue-awesome-swiper/issues/544
                    // https://github.com/surmon-china/vue-awesome-swiper/pull/545/files
                    var swiper = this.swiperInstance;
                    (_a = swiper === null || swiper === void 0 ? void 0 : swiper.loopDestroy) === null || _a === void 0 ? void 0 : _a.call(swiper);
                    (_b = swiper === null || swiper === void 0 ? void 0 : swiper.loopCreate) === null || _b === void 0 ? void 0 : _b.call(swiper);
                }
            },
            updateSwiper: function () {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                if (this[ComponentPropNames.AutoUpdate] && this.swiperInstance) {
                    this.autoReLoopSwiper();
                    (_b = (_a = this.swiperInstance) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a);
                    (_d = (_c = this.swiperInstance.navigation) === null || _c === void 0 ? void 0 : _c.update) === null || _d === void 0 ? void 0 : _d.call(_c);
                    (_f = (_e = this.swiperInstance.pagination) === null || _e === void 0 ? void 0 : _e.render) === null || _f === void 0 ? void 0 : _f.call(_e);
                    (_h = (_g = this.swiperInstance.pagination) === null || _g === void 0 ? void 0 : _g.update) === null || _h === void 0 ? void 0 : _h.call(_g);
                }
            },
            destroySwiper: function () {
                var _a, _b;
                if (this[ComponentPropNames.AutoDestroy] && this.swiperInstance) {
                    // https://github.com/surmon-china/vue-awesome-swiper/pull/341
                    // https://github.com/surmon-china/vue-awesome-swiper/issues/340
                    if (this.swiperInstance.initialized) {
                        (_b = (_a = this.swiperInstance) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 ? void 0 : _b.call(_a, this[ComponentPropNames.DeleteInstanceOnDestroy], this[ComponentPropNames.CleanupStylesOnDestroy]);
                    }
                }
            },
            initSwiper: function () {
                var options = this.swiperOptions;
                // If user hasn't explicitly provided modules, infer them from option flags
                if (!options.modules) {
                    var inferredModules = [];
                    if (options.navigation)
                        inferredModules.push(Navigation);
                    if (options.pagination)
                        inferredModules.push(Pagination);
                    if (options.scrollbar)
                        inferredModules.push(Scrollbar);
                    // parallax is enabled with `parallax: true`
                    if (options.parallax)
                        inferredModules.push(Parallax);
                    if (inferredModules.length) {
                        ;
                        options.modules = inferredModules;
                    }
                }
                this.swiperInstance = new SwiperClass(this.$el, options);
                bindSwiperEvents(this.swiperInstance, this.$emit.bind(this));
                this.$emit(ComponentEvents.Ready, this.swiperInstance);
            }
        },
        mounted: function () {
            if (!this.swiperInstance) {
                this.initSwiper();
            }
        },
        // Update swiper when the parent component activated with `keep-alive`.
        activated: function () {
            this.updateSwiper();
        },
        updated: function () {
            this.updateSwiper();
        },
        beforeDestroy: function () {
            // https://github.com/surmon-china/vue-awesome-swiper/commit/2924a9d4d3d1cf51c0d46076410b1f804b2b8a43#diff-7f4e0261ac562c0f354cb91a1ca8864f
            this.$nextTick(this.destroySwiper);
        },
        render: function (createElement) {
            return createElement('div', {
                staticClass: DEFAULT_CLASSES.containerClass,
                on: {
                    click: this.handleSwiperClick
                }
            }, [
                this.$slots[SlotNames.ParallaxBg],
                createElement('div', {
                    class: this.wrapperClass
                }, this.$slots.default),
                this.$slots[SlotNames.Pagination],
                this.$slots[SlotNames.PrevButton],
                this.$slots[SlotNames.NextButton],
                this.$slots[SlotNames.Scrollbar]
            ]);
        }
    });
}
//# sourceMappingURL=swiper.js.map