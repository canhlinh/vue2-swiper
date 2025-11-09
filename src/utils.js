/**
 * @file vue-awesome-swiper
 * @module utils
 * @author Surmon <https://github.com/surmon-china>
 */
export var kebabcase = function (string) {
    return string
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/\s+/g, '-')
        .toLowerCase();
};
//# sourceMappingURL=utils.js.map