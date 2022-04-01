"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
var createElement_js_1 = require("../../modules/CreateElement/createElement.js");
var SignIn_js_1 = require("../../pages/SignIn/SignIn.js");
var PopUp_js_1 = require("../PopUp/PopUp.js");
var AjaxSignIn_js_1 = require("../../modules/AjaxSignIn/AjaxSignIn.js");
var itemsMenu = {
    input: [
        {
            iconName: 'input',
            textText: 'Входящие',
        },
    ]
};
var Menu = /** @class */ (function () {
    function Menu(parent) {
        var _this = this;
        this.render = function () {
            var main = document.createElement('main');
            main.className = 'mainParent';
            _this.parent.appendChild(main);
            (0, createElement_js_1.createElementDiv)(main, '', 'parentMain');
            var temp = document.querySelector('.parentMain');
            (0, createElement_js_1.createElementDiv)(temp, '', 'menu');
            var parentMenu = document.querySelector('.menu');
            itemsMenu.input.forEach(function (item, index) {
                (0, createElement_js_1.createElementDiv)(parentMenu, '', 'manuPoint');
                var parent = document.getElementsByClassName('manuPoint')[index];
                (0, createElement_js_1.createElementImg)(parent, item.iconName, 'iconPoint1');
                (0, createElement_js_1.createElementDiv)(parent, item.textText, 'menuText1');
            }, parentMenu);
            var profile = document.querySelector('.profile');
            var profileEvent;
            profile.addEventListener('click', profileEvent = function (event) {
                var popUp = new PopUp_js_1.PopUp(main);
                popUp.render();
                event.stopPropagation();
                profile.removeEventListener('click', profileEvent);
                var docEvent;
                document.addEventListener('click', docEvent = function (event) {
                    if (event.target.className !== 'menuText' && event.target.className !== 'iconPoint') {
                        if (document.querySelector('.openFolder')) {
                            document.querySelector('.openFolder').remove();
                            document.removeEventListener('click', docEvent);
                            profile.addEventListener('click', profileEvent);
                        }
                    }
                    if (event.target.className === 'menuText' || event.target.className === 'iconPoint') {
                        var ajaxSignIn = new AjaxSignIn_js_1.Ajax();
                        ajaxSignIn.get("http://".concat(window.location.hostname, ":8080/logout"), 
                        // eslint-disable-next-line
                        function (status, responseText) {
                            if (status === 401) {
                                var signIn_1 = new SignIn_js_1.SignInRender(_this.parent);
                                signIn_1.render();
                            }
                            if (status !== 200)
                                return;
                            document.removeEventListener('click', docEvent);
                            var signIn = new SignIn_js_1.SignInRender(_this.parent);
                            signIn.render();
                        });
                    }
                });
            });
        };
        this.parent = parent;
    }
    return Menu;
}());
exports.Menu = Menu;
//# sourceMappingURL=Menu.js.map