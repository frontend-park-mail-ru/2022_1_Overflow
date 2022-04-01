"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonBase = void 0;
var ButtonBase = /** @class */ (function () {
    function ButtonBase(parent) {
        var _this = this;
        this.render = function () {
            // eslint-disable-next-line
            var template = Handlebars.compile(_this.html);
            var html = template({
                name: _this.name,
                class: _this.className,
                id: _this.id,
                type: _this.type,
            });
            _this.parent.insertAdjacentHTML('beforeend', html);
        };
        this.html = '<button id="{{id}}" class="{{class}}" type="{{type}}">{{name}}</button>';
        this.parent = parent;
    }
    Object.defineProperty(ButtonBase.prototype, "data", {
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "className", {
        set: function (classNameStr) {
            this.classNameStr = classNameStr;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "id", {
        set: function (idx) {
            this.idx = idx;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonBase.prototype, "type", {
        set: function (types) {
            this.types = types;
        },
        enumerable: false,
        configurable: true
    });
    return ButtonBase;
}());
exports.ButtonBase = ButtonBase;
//# sourceMappingURL=ButtonBase.js.map