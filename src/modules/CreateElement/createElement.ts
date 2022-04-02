import {DiveAndClass} from '../../ui-kit/DivAndClass/DiveAndClass';
import {ImageAndClass} from '../../ui-kit/ImageAndClass/ImageAndClass';
import {TextAndClass} from '../../ui-kit/TextAndClass/TextAndClass';
import {InputBase} from '../../ui-kit/InputBase/InputBase';
import {ButtonBase} from '../../ui-kit/ButtonBase/ButtonBase';

export const createElementButtonBase = (parent: Element, text: string, className: string, id: string, type: string) => {
    const elementInputBase = new ButtonBase(parent);
    elementInputBase.data = text;
    elementInputBase.className = className;
    elementInputBase.type = type;
    elementInputBase.id = id;
    elementInputBase.render();
    return elementInputBase;
};

export const createElementInputBase = (parent: Element, placeholder: string, id: string, type: string) => {
    const elementInputBase = new InputBase(parent);
    elementInputBase.placeholder = placeholder;
    elementInputBase.type = type;
    elementInputBase.id = id;
    elementInputBase.render();
    return elementInputBase;
};

export const createElementDiv = (parent: Element, text: string, className: string) => {
    const elementDiv = new DiveAndClass(parent);
    elementDiv.data = text;
    elementDiv.class = className;
    elementDiv.render();
    return elementDiv;
};

export const createElementP = (parent: Element, text: string, className: string) => {
    const elementP = new TextAndClass(parent);
    elementP.data = text;
    elementP.class = className;
    elementP.render();
    return elementP;
};

export const createElementImg = (parent: Element, text: string, srcPath: string,  className: string) => {
    const elementImg = new ImageAndClass(parent);
    elementImg.data = text;
    elementImg.class = className;
    elementImg.src = srcPath;
    elementImg.render();
    return elementImg;
};
