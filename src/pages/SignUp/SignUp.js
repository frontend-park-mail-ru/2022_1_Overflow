"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpRender = void 0;
var SignUp_js_1 = require("../../components/SignUp/SignUp.js");
var SignUpRender = /** @class */ (function () {
    function SignUpRender(parent) {
        var _this = this;
        this.render = function () {
            _this.parent.innerHTML = '';
            var signUp = new SignUp_js_1.SignUp(_this.parent);
            signUp.render();
        };
        this.parent = parent;
    }
    return SignUpRender;
}());
exports.SignUpRender = SignUpRender;
//# sourceMappingURL=SignUp.js.map