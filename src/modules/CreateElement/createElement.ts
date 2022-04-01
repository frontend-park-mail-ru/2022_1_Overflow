import {DiveAndClass} from '../../ui-kit/DivAndClass/DiveAndClass.js';
import {ImageAndClass} from '../../ui-kit/ImageAndClass/ImageAndClass.js';
import {TextAndClass} from '../../ui-kit/TextAndClass/TextAndClass.js';
import {InputBase} from '../../ui-kit/InputBase/InputBase.js';
import {ButtonBase} from '../../ui-kit/ButtonBase/ButtonBase.js';

export const createElementButtonBase = (parent: Element, text: string, className: string, id: string, type: string) => {
    const elementInputBase = new ButtonBase(parent);
    elementInputBase.data = text;
    elementInputBase.className = className;
    elementInputBase.type = type;
    elementInputBase.id = id;
    elementInputBase.render();
    return elementInputBase;
};

export const createElementInputBase = (parent: Element, placeholder, id, type) => {
    const elementInputBase = new InputBase(parent);
    elementInputBase.placeholder = placeholder;
    elementInputBase.type = type;
    elementInputBase.id = id;
    elementInputBase.render();
    return elementInputBase;
};

export const createElementDiv = (parent, text, className) => {
    const elementDiv = new DiveAndClass(parent);
    elementDiv.data = text;
    elementDiv.class = className;
    elementDiv.render();
    return elementDiv;
};

export const createElementP = (parent, text, className) => {
    const elementP = new TextAndClass(parent);
    elementP.data = text;
    elementP.class = className;
    elementP.render();
    return elementP;
};

export const createElementImg = (parent, text, className) => {
    const elementImg = new ImageAndClass(parent);
    elementImg.data = text;
    elementImg.class = className;
    elementImg.render();
    return elementImg;
};
