import './DiveAndClass.css';
import * as templateHBS from './DiveAndClass.hbs';

export class DiveAndClass<T extends Element> {
    private parent: T;
    private name: string;
    private className: string;

    constructor(parent: T) {
        this.parent = parent;
    }

    set data(name: string){
        this.name = name;
    }

    set class(className: string){
        this.className = className;
    }

    render = () => {
        this.parent.insertAdjacentHTML('beforeend', templateHBS({
            name: this.name,
            class: this.className,
        }));
    };
}