"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElementImg = exports.createElementP = exports.createElementDiv = exports.createElementInputBase = exports.createElementButtonBase = void 0;
var DiveAndClass_js_1 = require("../../ui-kit/DivAndClass/DiveAndClass.js");
var ImageAndClass_js_1 = require("../../ui-kit/ImageAndClass/ImageAndClass.js");
var TextAndClass_js_1 = require("../../ui-kit/TextAndClass/TextAndClass.js");
var InputBase_js_1 = require("../../ui-kit/InputBase/InputBase.js");
var ButtonBase_js_1 = require("../../ui-kit/ButtonBase/ButtonBase.js");
var createElementButtonBase = function (parent, text, className, id, type) {
    var elementInputBase = new ButtonBase_js_1.ButtonBase(parent);
    elementInputBase.data = text;
    elementInputBase.className = className;
    elementInputBase.type = type;
    elementInputBase.id = id;
    elementInputBase.render();
    return elementInputBase;
};
exports.createElementButtonBase = createElementButtonBase;
var createElementInputBase = function (parent, placeholder, id, type) {
    var elementInputBase = new InputBase_js_1.InputBase(parent);
    elementInputBase.placeholder = placeholder;
    elementInputBase.type = type;
    elementInputBase.id = id;
    elementInputBase.render();
    return elementInputBase;
};
exports.createElementInputBase = createElementInputBase;
var createElementDiv = function (parent, text, className) {
    var elementDiv = new DiveAndClass_js_1.DiveAndClass(parent);
    elementDiv.data = text;
    elementDiv.class = className;
    elementDiv.render();
    return elementDiv;
};
exports.createElementDiv = createElementDiv;
var createElementP = function (parent, text, className) {
    var elementP = new TextAndClass_js_1.TextAndClass(parent);
    elementP.data = text;
    elementP.class = className;
    elementP.render();
    return elementP;
};
exports.createElementP = createElementP;
var createElementImg = function (parent, text, className) {
    var elementImg = new ImageAndClass_js_1.ImageAndClass(parent);
    elementImg.data = text;
    elementImg.class = className;
    elementImg.render();
    return elementImg;
};
exports.createElementImg = createElementImg;
//# sourceMappingURL=createElement.js.map