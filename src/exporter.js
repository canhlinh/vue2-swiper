/**
 * @file vue-awesome-swiper
 * @module exporter
 * @author Surmon <https://github.com/surmon-china>
 */
import { CoreNames } from './constants';
import getDirective from './directive';
import getSwiperComponent from './swiper';
import SwiperSlideComponent from './slide';
var getInstaller = function (SwiperClass) {
    var install = function (Vue, globalOptions) {
        if (install.installed)
            return;
        var SwiperComponent = getSwiperComponent(SwiperClass);
        if (globalOptions) {
            SwiperComponent.options.props.defaultOptions.default = function () { return globalOptions; };
        }
        Vue.component(CoreNames.SwiperComponent, SwiperComponent);
        Vue.component(CoreNames.SwiperSlideComponent, SwiperSlideComponent);
        Vue.directive(CoreNames.SwiperDirective, getDirective(SwiperClass, globalOptions));
        install.installed = true;
    };
    return install;
};
export default function exporter(SwiperClass) {
    var _a;
    return _a = {
            version: 'PACKAGE_VERSION',
            install: getInstaller(SwiperClass),
            directive: getDirective(SwiperClass)
        },
        _a[CoreNames.SwiperComponent] = getSwiperComponent(SwiperClass),
        _a[CoreNames.SwiperSlideComponent] = SwiperSlideComponent,
        _a;
}
//# sourceMappingURL=exporter.js.map