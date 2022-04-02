import './InputBase.css';
import * as templateHBS from './InputBase.hbs';

export class InputBase<T extends Element> {
    private parent: T;
    private types: string;
    private idx: string;
    private placeholders: string;

    constructor(parent: T) {
        this.parent = parent;
    }


    set id(name: string){
        this.idx = name;
    }

    set type(name: string){
        this.types = name;
    }

    set placeholder(name: string){
        this.placeholders = name;
    }

    render = () => {
        this.parent.insertAdjacentHTML('beforeend', templateHBS({
            placeholder: this.placeholders,
            id: this.idx,
            type: this.types,
        }));
    };
}