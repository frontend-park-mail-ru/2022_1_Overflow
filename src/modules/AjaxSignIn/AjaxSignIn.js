"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ajax = void 0;
var noop = function () {
};
var Ajax = /** @class */ (function () {
    function Ajax() {
    }
    Ajax.prototype.post = function (url, callback, data) {
        return this._ajax(url, 'POST', data, callback);
    };
    Ajax.prototype.get = function (url, callback) {
        return this._ajax(url, 'GET', null, callback);
    };
    Ajax.prototype._ajax = function (url, method, data, callback) {
        if (url === void 0) { url = '/'; }
        if (method === void 0) { method = 'POST'; }
        if (data === void 0) { data = null; }
        if (callback === void 0) { callback = noop; }
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.withCredentials = true;
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState !== XMLHttpRequest.DONE)
                return;
            callback(xhr.status, xhr.responseText);
        });
        if (data) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(data));
            return;
        }
        xhr.send();
    };
    Ajax.prototype.promisifyGet = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._ajax(url, 'GET', null, function (status, responseText) {
                if (status !== 200) {
                    reject(responseText);
                }
                resolve(responseText);
            });
        });
    };
    Ajax.prototype.promisifyPostSignUp = function (url, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._ajax(url, 'POST', data, function (status, responseText) {
                if (status !== 200) {
                    reject(responseText);
                }
                resolve(data);
            });
        });
    };
    Ajax.prototype.promisifyPostSignIn = function (url, data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._ajax(url, 'POST', data, function (status, responseText) {
                if (status !== 200) {
                    reject(responseText);
                }
                resolve();
            });
        });
    };
    return Ajax;
}());
exports.Ajax = Ajax;
//# sourceMappingURL=AjaxSignIn.js.map