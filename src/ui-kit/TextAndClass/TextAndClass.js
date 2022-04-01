"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAndClass = void 0;
var TextAndClass = /** @class */ (function () {
    function TextAndClass(parent) {
        var _this = this;
        this.render = function () {
            // eslint-disable-next-line
            var template = Handlebars.compile(_this.html);
            var html = template({
                class: _this.className,
                text: _this.text,
            });
            _this.parent.insertAdjacentHTML('beforeend', html);
        };
        this.html = '<p class="{{class}}">{{ text }}</p>';
        this.parent = parent;
    }
    Object.defineProperty(TextAndClass.prototype, "data", {
        set: function (text) {
            this.text = text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextAndClass.prototype, "class", {
        set: function (className) {
            this.className = className;
        },
        enumerable: false,
        configurable: true
    });
    return TextAndClass;
}());
exports.TextAndClass = TextAndClass;
//# sourceMappingURL=TextAndClass.js.map