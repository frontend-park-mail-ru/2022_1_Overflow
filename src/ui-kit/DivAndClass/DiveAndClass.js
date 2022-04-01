"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiveAndClass = void 0;
var DiveAndClass = /** @class */ (function () {
    function DiveAndClass(parent) {
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
        this.html = '<div class="{{class}}">{{name}}</div>';
        this.parent = parent;
    }
    Object.defineProperty(DiveAndClass.prototype, "data", {
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiveAndClass.prototype, "class", {
        set: function (name) {
            this.className = name;
        },
        enumerable: false,
        configurable: true
    });
    return DiveAndClass;
}());
exports.DiveAndClass = DiveAndClass;
//# sourceMappingURL=DiveAndClass.js.map