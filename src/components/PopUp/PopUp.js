"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PopUp_parent, _PopUp_style;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopUp = void 0;
var createElement_js_1 = require("../../modules/CreateElement/createElement.js");
var PopUp = /** @class */ (function () {
    function PopUp(parent) {
        _PopUp_parent.set(this, void 0);
        _PopUp_style.set(this, void 0);
        __classPrivateFieldSet(this, _PopUp_parent, parent, "f");
    }
    PopUp.prototype.render = function () {
        (0, createElement_js_1.createElementDiv)(__classPrivateFieldGet(this, _PopUp_parent, "f"), '', 'openFolder');
        var openFolder = document.getElementsByClassName('openFolder')[0];
        __classPrivateFieldSet(this, _PopUp_style, openFolder, "f");
        (0, createElement_js_1.createElementDiv)(openFolder, '', 'exit');
        var exit = document.getElementsByClassName('exit')[0];
        (0, createElement_js_1.createElementImg)(exit, 'door', 'iconPoint');
        (0, createElement_js_1.createElementDiv)(exit, 'Выход', 'menuText');
    };
    return PopUp;
}());
exports.PopUp = PopUp;
_PopUp_parent = new WeakMap(), _PopUp_style = new WeakMap();
//# sourceMappingURL=PopUp.js.map