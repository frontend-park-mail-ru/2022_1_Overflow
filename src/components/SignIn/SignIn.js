"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn = void 0;
var createElement_js_1 = require("../../modules/CreateElement/createElement.js");
var MainPage_js_1 = require("../../pages/MainPage/MainPage.js");
var SignUp_js_1 = require("../../pages/SignUp/SignUp.js");
var CheckInput_1 = require("../../modules/CheckInput/CheckInput");
var AjaxSignIn_js_1 = require("../../modules/AjaxSignIn/AjaxSignIn.js");
var LenghtCheck_js_1 = require("../../modules/LenghtCheck/LenghtCheck.js");
var SignIn = /** @class */ (function () {
    function SignIn(parent) {
        this.parent = parent;
    }
    SignIn.prototype.setError = function (text) {
        document.getElementById('inputEmail').style.borderColor = 'red';
        document.getElementById('inputPassword').style.borderColor = 'red';
        var error = document.querySelector('.invalidMsg');
        error.style.visibility = 'visible';
        error.textContent = text;
    };
    SignIn.prototype.getForm = function (parent) {
        var _this = this;
        var email = document.getElementById('inputEmail').textContent;
        var errEmail = (0, LenghtCheck_js_1.LenghtCheck)(email, 'логина');
        if (errEmail !== '') {
            this.setError(errEmail);
            return;
        }
        var password = document.getElementById('inputPassword').textContent;
        password = (0, CheckInput_1.CheckInput)(password);
        var errPassword = (0, LenghtCheck_js_1.LenghtCheck)(password, 'пароля');
        if (errPassword !== '') {
            this.setError(errPassword);
            return;
        }
        var ajaxSignIn = new AjaxSignIn_js_1.Ajax();
        ajaxSignIn.promisifyPostSignIn("http://".concat(window.location.hostname, ":8080/signin"), {
            'username': email,
            'password': password,
        }).then(function () {
            var main = new MainPage_js_1.MainPage(parent);
            main.render();
            return true;
        }).catch(function (responseText) {
            var json = JSON.parse(responseText);
            _this.setError(json['message']);
            return false;
        });
    };
    SignIn.prototype.render = function () {
        var _this = this;
        (0, createElement_js_1.createElementDiv)(this.parent, '', 'container');
        var container = document.querySelector('.container');
        var form = document.createElement('form');
        form.className = 'showbox showboxCenter showboxSelfCenter shadow';
        form.onsubmit = function (event) {
            event.preventDefault();
            return _this.getForm(_this.parent);
        };
        container.appendChild(form);
        (0, createElement_js_1.createElementImg)(form, 'LogoSigin', 'mb2');
        (0, createElement_js_1.createElementInputBase)(form, 'Логин', 'inputEmail', 'text');
        (0, createElement_js_1.createElementInputBase)(form, 'Пароль', 'inputPassword', 'password');
        (0, createElement_js_1.createElementDiv)(form, 'Не верное имя пользователя или пароль.', 'invalidMsg');
        var invalidMsg = document.querySelector('.invalidMsg');
        invalidMsg.style.visibility = 'hidden';
        (0, createElement_js_1.createElementDiv)(form, '', 'buttonGrid mt4');
        var divParent = document.getElementsByClassName('buttonGrid mt4')[0];
        // let aForm = document.createElement('a');
        // aForm.className = 'forgetPass';
        // aForm.text = 'Забыл пароль';
        // divParent.appendChild(aForm);
        (0, createElement_js_1.createElementButtonBase)(divParent, 'Войти', 'btn btnPrimary', 'signInButton', 'submit');
        (0, createElement_js_1.createElementButtonBase)(divParent, 'Зарегистрироваться', 'btn btnSecondary', 'registration', 'button');
        var goRegistration = document.getElementById('registration');
        goRegistration.addEventListener('click', function () {
            var signUp = new SignUp_js_1.SignUpRender(_this.parent);
            signUp.render();
        });
    };
    return SignIn;
}());
exports.SignIn = SignIn;
//# sourceMappingURL=SignIn.js.map