"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainPage = void 0;
var Header_js_1 = require("../../components/Header/Header.js");
var Menu_js_1 = require("../../components/Menu/Menu.js");
var Message_js_1 = require("../../components/Message/Message.js");
var MainPage = /** @class */ (function () {
    function MainPage(parent) {
        var _this = this;
        this.render = function () {
            _this.parent.innerHTML = '';
            var handler = new Header_js_1.Header(_this.parent);
            handler.render();
            var menu = new Menu_js_1.Menu(_this.parent);
            menu.render();
            var main = document.querySelector('.parentMain');
            var message = new Message_js_1.Message(main);
            message.render();
        };
        this.parent = parent;
    }
    return MainPage;
}());
exports.MainPage = MainPage;
//# sourceMappingURL=MainPage.js.map