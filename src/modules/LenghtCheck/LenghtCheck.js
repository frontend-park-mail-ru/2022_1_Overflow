"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LenghtCheck = void 0;
var CheckInput_1 = require("../CheckInput/CheckInput");
var LenghtCheck = function (text, type) {
    text = (0, CheckInput_1.CheckInput)(text);
    if (text.length == 0) {
        return "\u041F\u043E\u043B\u0435 ".concat(type, " \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0443\u0441\u0442\u044B\u043C.");
    }
    if (text.length <= 2) {
        return "\u0414\u043B\u0438\u043D\u043D\u0430 ".concat(type, " \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0430\u044F.");
    }
    if (text.length > 20) {
        return "\u0414\u043B\u0438\u043D\u043D\u0430 ".concat(type, " \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u0430\u044F.");
    }
    return '';
};
exports.LenghtCheck = LenghtCheck;
//# sourceMappingURL=LenghtCheck.js.map