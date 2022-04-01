"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckInput = void 0;
var safe_js_1 = require("../Safe/safe.js");
var CheckInput = function (str) {
    str = (0, safe_js_1.safe)(str);
    str.trim();
    return str;
};
exports.CheckInput = CheckInput;
//# sourceMappingURL=CheckInput.js.map