import './ImageAndClass.css';
import * as templateHBS from './ImageAndClass.hbs';

export class ImageAndClass<T extends Element> {
    private parent: T;
    private name: string;
    private className: string;
    private srcPath: string;

    constructor(parent: T) {
        this.parent = parent;
    }

    set data(name: string) {
        this.name = name;
    }

    set src(srcPath: string) {
        this.srcPath = srcPath;
    }

    set class(className: string) {
        this.className = className;
    }

    render = () => {
        this.parent.insertAdjacentHTML('beforeend', templateHBS({
            name: this.name,
            class: this.className,
            src: this.srcPath,
        }));
    };
}