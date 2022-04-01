"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
var createElement_js_1 = require("../../modules/CreateElement/createElement.js");
var SignIn_js_1 = require("../../pages/SignIn/SignIn.js");
var AjaxSignIn_js_1 = require("../../modules/AjaxSignIn/AjaxSignIn.js");
var Header = /** @class */ (function () {
    function Header(parent) {
        var _this = this;
        this.render = function () {
            var head = document.createElement('header');
            _this.parent.appendChild(head);
            (0, createElement_js_1.createElementDiv)(head, '', 'parentHead');
            var divParentObject = document.getElementsByClassName('parentHead')[0];
            (0, createElement_js_1.createElementImg)(divParentObject, 'Logo', 'logoLogo');
            (0, createElement_js_1.createElementP)(divParentObject, 'OverMail', 'logoTitle');
            (0, createElement_js_1.createElementDiv)(divParentObject, '', 'spaseBox');
            (0, createElement_js_1.createElementDiv)(divParentObject, '', 'profile');
            var divProfile = document.getElementsByClassName('profile')[0];
            (0, createElement_js_1.createElementImg)(divProfile, 'avatar', 'avatar');
            (0, createElement_js_1.createElementP)(divProfile, '', 'email');
            (0, createElement_js_1.createElementImg)(divProfile, 'arrow', 'arrow');
            var ajaxGetEmail = new AjaxSignIn_js_1.Ajax();
            var jsonProfile;
            ajaxGetEmail.get("http://".concat(window.location.hostname, ":8080/profile"), 
            // eslint-disable-next-line
            function (status, responseText) {
                if (status === 401) {
                    var signIn = new SignIn_js_1.SignInRender(_this.parent);
                    signIn.render();
                }
                if (status !== 200) {
                    return;
                }
                jsonProfile = JSON.parse(responseText);
                var email = document.querySelector('.email');
                email.textContent = jsonProfile['Username'];
            });
        };
        this.parent = parent;
    }
    return Header;
}());
exports.Header = Header;
//# sourceMappingURL=Header.js.map