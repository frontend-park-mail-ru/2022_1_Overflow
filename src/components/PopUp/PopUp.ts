import {createElementDiv, createElementImg} from '../../modules/CreateElement/createElement.js';

export class PopUp {
    #parent;
    #style;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        createElementDiv(this.#parent, '', 'openFolder');
        const openFolder = document.getElementsByClassName('openFolder')[0];
        this.#style= openFolder;
        createElementDiv(openFolder, '', 'exit');
        const exit = document.getElementsByClassName('exit')[0];
        createElementImg(exit, 'door', 'iconPoint');
        createElementDiv(exit, 'Выход', 'menuText');
    }
}