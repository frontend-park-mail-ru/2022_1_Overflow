import {createElementDiv, createElementImg} from '../../modules/CreateElement/createElement';
import doorSvg from '../../image/door.svg'

export class PopUp<T extends Element> {
    private parent: T;
    private style: Element | null;

    constructor(parent: T) {
        this.parent = parent;
    }

    render() {
        createElementDiv(this.parent, '', 'openFolder');
        const openFolder = document.querySelector('.openFolder');
        this.style = openFolder;
        createElementDiv(openFolder!, '', 'exit');
        const exit = document.querySelector('.exit');
        createElementImg(exit!, 'door', doorSvg, 'iconPoint');
        createElementDiv(exit!, 'Выход', 'menuText');
    }
}