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
var _Message_parent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var createElement_js_1 = require("../../modules/CreateElement/createElement.js");
var SignIn_js_1 = require("../../pages/SignIn/SignIn.js");
var AjaxSignIn_js_1 = require("../../modules/AjaxSignIn/AjaxSignIn.js");
var Message = /** @class */ (function () {
    function Message(parent) {
        _Message_parent.set(this, void 0);
        __classPrivateFieldSet(this, _Message_parent, parent, "f");
    }
    Message.prototype.render = function () {
        var _this = this;
        (0, createElement_js_1.createElementDiv)(__classPrivateFieldGet(this, _Message_parent, "f"), '', 'message');
        var message = document.getElementsByClassName('message')[0];
        var ajax = new AjaxSignIn_js_1.Ajax();
        ajax.promisifyGet("http://".concat(window.location.hostname, ":8080/mail/income")).then(function (responseText) {
            var parsed = JSON.parse(responseText);
            if (parsed === null) {
                (0, createElement_js_1.createElementDiv)(message, '', 'messageText');
                var parent_1 = document.getElementsByClassName('messageText')[0];
                (0, createElement_js_1.createElementP)(parent_1, 'Список писем пуст', 'messageEmpty');
                return;
            }
            var itemsMassage = {
                input: []
            };
            parsed.forEach(function (pars) {
                var date = new Date(pars['date']);
                itemsMassage.input.push({
                    avatar: 'avatar',
                    title: pars['theme'],
                    subTitle: pars['text'],
                    time: (('0' + date.getDate()).slice(-2) + ':' + ('0' + (date.getMonth() + 1)).slice(-2)),
                });
            });
            _this.renderMassege(message, itemsMassage);
        }).catch(function () {
            var signIn = new SignIn_js_1.SignInRender(__classPrivateFieldGet(_this, _Message_parent, "f"));
            signIn.render();
        });
    };
    Message.prototype.renderMassege = function (message, itemsMassage) {
        itemsMassage.input.forEach(function (item, index) {
            (0, createElement_js_1.createElementDiv)(message, '', 'messageText');
            var parent = document.getElementsByClassName('messageText')[index];
            (0, createElement_js_1.createElementImg)(parent, item.avatar, 'avatarMassage');
            (0, createElement_js_1.createElementP)(parent, item.title, 'messageTextText');
            (0, createElement_js_1.createElementP)(parent, item.subTitle, 'messageTextSub');
            (0, createElement_js_1.createElementP)(parent, '', 'messageTextBlock');
            (0, createElement_js_1.createElementP)(parent, item.time, 'messageTextTime');
            if (itemsMassage.input.length - 1 !== index) {
                var hr = document.createElement('hr');
                hr.color = 'EBEBEB';
                hr.size = '1';
                hr.width = '100%';
                message.appendChild(hr);
            }
            parent.addEventListener('mouseover', function () {
                parent.style.backgroundSize = '100%';
                parent.style.backgroundColor = '#F1F1F1';
                parent.style.borderRadius = '15px';
            });
            parent.addEventListener('mouseout', function () {
                parent.style.backgroundColor = '#FFFFFF';
            });
        }, message);
    };
    return Message;
}());
exports.Message = Message;
_Message_parent = new WeakMap();
//# sourceMappingURL=Message.js.map