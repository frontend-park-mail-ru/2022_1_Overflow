"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageAndClass = void 0;
var ImageAndClass = /** @class */ (function () {
    function ImageAndClass(parent) {
        var _this = this;
        this.render = function () {
            // eslint-disable-next-line
            var template = Handlebars.compile(_this.html);
            var html = template({
                name: _this.name,
                class: _this.className,
            });
            _this.parent.insertAdjacentHTML('beforeend', html);
        };
        this.html = '<img class="{{class}}" src="./image/{{name}}.svg" alt="{{name}}">';
        this.parent = parent;
    }
    Object.defineProperty(ImageAndClass.prototype, "data", {
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageAndClass.prototype, "class", {
        set: function (className) {
            this.className = className;
        },
        enumerable: false,
        configurable: true
    });
    return ImageAndClass;
}());
exports.ImageAndClass = ImageAndClass;
//# sourceMappingURL=ImageAndClass.js.map