import './TextAndClass.css';
import * as templateHBS from './TextAndClass.hbs';

export class TextAndClass<T extends Element> {
    private parent: T;
    private text: string;
    private className: string;

    constructor(parent: T) {
        this.parent = parent;
    }

    set data(text: string) {
        this.text = text;
    }

    set class(className: string) {
        this.className = className;
    }

    render = () => {
        this.parent.insertAdjacentHTML('beforeend', templateHBS({
            class: this.className,
            text: this.text,
        }));
    };
}

