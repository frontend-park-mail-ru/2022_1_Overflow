import {createElementDiv, createElementImg} from  '../../modules/CreateElement/createElement.js';

export class PopUp {
    #parent;
    #style;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        createElementDiv(this.#parent, '', 'openFolder');
        const openFolder = document.querySelector('.openFolder');
        this.#style= openFolder;
        createElementDiv(openFolder, '', 'exit');
        const exit = document.querySelector('.exit');
        createElementImg(exit, 'door', 'iconPoint');
        createElementDiv(exit, 'Выход', 'menuText');
    }
}