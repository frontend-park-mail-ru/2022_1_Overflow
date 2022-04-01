"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInRender = void 0;
var SignIn_js_1 = require("../../components/SignIn/SignIn.js");
var SignInRender = /** @class */ (function () {
    function SignInRender(parent) {
        var _this = this;
        this.render = function () {
            _this.parent.innerHTML = '';
            var signIn = new SignIn_js_1.SignIn(_this.parent);
            signIn.render();
        };
        this.parent = parent;
    }
    return SignInRender;
}());
exports.SignInRender = SignInRender;
//# sourceMappingURL=SignIn.js.map