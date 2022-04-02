import './ButtonBase.css';
import * as templateHBS from './ButtonBase.hbs';

export class ButtonBase<T extends Element> {
    private parent: T;
    private name: string;
    private classNameStr: string;
    private idx: string;
    private types: string;

    constructor(parent: T) {
        this.parent = parent;
    }

    set data(name: string) {
        this.name = name;
    }

    set className(classNameStr: string) {
        this.classNameStr = classNameStr;
    }

    set id(idx: string) {
        this.idx = idx;
    }

    set type(types: string) {
        this.types = types;
    }

    render = () => {
        this.parent.insertAdjacentHTML('beforeend', templateHBS({
            name: this.name,
            class: this.classNameStr,
            id: this.idx,
            type: this.types,
        }));
    };
}