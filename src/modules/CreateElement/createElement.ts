import {DiveAndClass} from '../../ui-kit/DivAndClass/DiveAndClass';
import {ImageAndClass} from '../../ui-kit/ImageAndClass/ImageAndClass';

export const createElementDiv = (parent: Element, text: string, className: string) => {
    const elementDiv = new DiveAndClass(parent);
    elementDiv.data = text;
    elementDiv.class = className;
    elementDiv.render();
    return elementDiv;
};

export const createElementImg = (parent: Element, text: string, srcPath: string, className: string) => {
    const elementImg = new ImageAndClass(parent);
    elementImg.data = text;
    elementImg.class = className;
    elementImg.src = srcPath;
    elementImg.render();
    return elementImg;
};
