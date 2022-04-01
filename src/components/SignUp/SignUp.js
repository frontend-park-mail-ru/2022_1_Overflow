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
var _SignUp_parent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUp = void 0;
var createElement_js_1 = require("../../modules/CreateElement/createElement.js");
var SignIn_js_1 = require("../../pages/SignIn/SignIn.js");
var AjaxSignIn_js_1 = require("../../modules/AjaxSignIn/AjaxSignIn.js");
var LenghtCheck_js_1 = require("../../modules/LenghtCheck/LenghtCheck.js");
var MainPage_js_1 = require("../../pages/MainPage/MainPage.js");
var SignUp = /** @class */ (function () {
    function SignUp(parent) {
        _SignUp_parent.set(this, void 0);
        __classPrivateFieldSet(this, _SignUp_parent, parent, "f");
    }
    SignUp.prototype.setError = function (text) {
        document.getElementById('inputFirstName').style.borderColor = 'red';
        document.getElementById('inputLastName').style.borderColor = 'red';
        document.getElementById('inputEmail').style.borderColor = 'red';
        document.getElementById('inputPassword').style.borderColor = 'red';
        document.getElementById('inputPasswordRepeat').style.borderColor = 'red';
        document.querySelector('.invalidMsg').style.visibility = 'visible';
        document.querySelector('.invalidMsg').textContent = text;
    };
    SignUp.prototype.getForm = function () {
        var _this = this;
        var firstName = document.getElementById('inputFirstName').value;
        var errorFirstName = (0, LenghtCheck_js_1.LenghtCheck)(firstName, 'имени');
        if (errorFirstName !== '') {
            this.setError(errorFirstName);
            return;
        }
        var lastName = document.getElementById('inputLastName').value;
        var errorLastName = (0, LenghtCheck_js_1.LenghtCheck)(lastName, 'фамилии');
        if (errorLastName !== '') {
            this.setError(errorLastName);
            return;
        }
        var email = document.getElementById('inputEmail').value;
        var errorEmail = (0, LenghtCheck_js_1.LenghtCheck)(email, 'логина');
        if (errorEmail !== '') {
            this.setError(errorEmail);
            return;
        }
        var password = document.getElementById('inputPassword').value;
        var errorPassword = (0, LenghtCheck_js_1.LenghtCheck)(password, 'пароля');
        if (errorPassword !== '') {
            this.setError(errorPassword);
            return;
        }
        var password_confirmation = document.getElementById('inputPasswordRepeat').value;
        var errorPassword_confirmation = (0, LenghtCheck_js_1.LenghtCheck)(password_confirmation, 'повтора пароля');
        if (errorPassword_confirmation !== '') {
            this.setError(errorPassword_confirmation);
            return;
        }
        if (password !== password_confirmation) {
            this.setError('Поля пароля и повтора пароля не совпадают.');
            return;
        }
        var ajax = new AjaxSignIn_js_1.Ajax();
        ajax.promisifyPostSignUp("http://".concat(window.location.hostname, ":8080/signup"), {
            'first_name': firstName,
            'last_name': lastName,
            'username': email,
            'password': password,
            'password_confirmation': password_confirmation,
        }).then(function (data) {
            return ajax.promisifyPostSignIn("http://".concat(window.location.hostname, ":8080/signin"), {
                'username': data['username'],
                'password': data['password'],
            });
        }).then(function () {
            var main = new MainPage_js_1.MainPage(__classPrivateFieldGet(_this, _SignUp_parent, "f"));
            main.render();
        }).catch(function (responseText) {
            var jsonerror = JSON.parse(responseText);
            _this.setError(jsonerror['message']);
        });
    };
    SignUp.prototype.render = function () {
        var _this = this;
        (0, createElement_js_1.createElementDiv)(__classPrivateFieldGet(this, _SignUp_parent, "f"), '', 'container');
        var container = document.querySelector('.container');
        var form = document.createElement('form');
        form.onsubmit = function (event) {
            event.preventDefault();
            return _this.getForm(__classPrivateFieldGet(_this, _SignUp_parent, "f"));
        };
        form.className = 'showbox showboxCenter showboxSelfCenter shadow';
        container.appendChild(form);
        (0, createElement_js_1.createElementImg)(form, 'LogoSigin', 'mb2');
        (0, createElement_js_1.createElementInputBase)(form, 'Имя', 'inputFirstName', 'text');
        (0, createElement_js_1.createElementInputBase)(form, 'Фамилия', 'inputLastName', 'text');
        (0, createElement_js_1.createElementInputBase)(form, 'Логин', 'inputEmail', 'text');
        (0, createElement_js_1.createElementInputBase)(form, 'Пароль', 'inputPassword', 'password');
        (0, createElement_js_1.createElementInputBase)(form, 'Повторить пароль', 'inputPasswordRepeat', 'password');
        (0, createElement_js_1.createElementDiv)(form, 'Не верное имя пользователя или пароль.', 'invalidMsg');
        var invalidMsg = document.querySelector('.invalidMsg');
        invalidMsg.style.visibility = 'hidden';
        (0, createElement_js_1.createElementDiv)(form, '', 'buttonGrid mt4');
        var divParent = document.getElementsByClassName('buttonGrid mt4')[0];
        (0, createElement_js_1.createElementButtonBase)(divParent, 'Создать', 'btn btnPrimary', 'signupButton', 'submit');
        (0, createElement_js_1.createElementButtonBase)(divParent, 'Назад', 'btn btnSecondary', 'backButton', 'button');
        var goSignIn = document.getElementById('backButton');
        goSignIn.addEventListener('click', function () {
            var signIn = new SignIn_js_1.SignInRender(__classPrivateFieldGet(_this, _SignUp_parent, "f"));
            signIn.render();
        });
    };
    return SignUp;
}());
exports.SignUp = SignUp;
_SignUp_parent = new WeakMap();
//# sourceMappingURL=SignUp.js.map