"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputBase = void 0;
var Handlebars = require("handlebars");
var InputBase = /** @class */ (function () {
    function InputBase(parent) {
        var _this = this;
        this.render = function () {
            // eslint-disable-next-line
            var template = Handlebars.compile(_this.html);
            var html = template({
                placeholder: _this.placeholder,
                id: _this.id,
                type: _this.type,
            });
            _this.parent.insertAdjacentHTML('beforeend', html);
        };
        this.html = '<input type="{{type}}" id="{{id}}" placeholder="{{placeholder}}">';
        this.parent = parent;
    }
    Object.defineProperty(InputBase.prototype, "id", {
        set: function (name) {
            this.idx = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputBase.prototype, "type", {
        set: function (name) {
            this.types = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InputBase.prototype, "placeholder", {
        set: function (name) {
            this.placeholders = name;
        },
        enumerable: false,
        configurable: true
    });
    return InputBase;
}());
exports.InputBase = InputBase;
//# sourceMappingURL=InputBase.js.map