import {createElementDiv, createElementP, createElementImg} from '../../modules/CreateElement/createElement.js';
import {getCookie} from '../../modules/GetCookie/GetCookie.js';

export class Header {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        const head = document.createElement('header');
        this.#parent.appendChild(head);

        createElementDiv(head, '', 'parentHead');
        const divParentObject = document.getElementsByClassName('parentHead')[0];
        createElementImg(divParentObject, 'Logo', 'logoLogo');
        createElementP(divParentObject, 'OverMail', 'logoTitle');
        createElementDiv(divParentObject, '', 'spaseBox');
        createElementImg(divParentObject, 'avatar', 'avatar');
        createElementP(divParentObject, getCookie('email'), 'email');
        createElementImg(divParentObject, 'strelka', 'strelka');
    };
}