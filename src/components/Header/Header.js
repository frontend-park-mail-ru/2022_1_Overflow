import {createElementDiv, createElementP, createElementImg} from  "../../modules/CreateElement/createElement.js"
import {SignInRender} from "../../pages/SignIn/SignIn.js";

export class Header {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        let head = document.createElement('header');
        this.#parent.appendChild(head);

        createElementDiv(head, '', 'parentHead');
        let divParentObject = document.getElementsByClassName('parentHead')[0]
        createElementImg(divParentObject, 'Logo', 'logoLogo');
        createElementP(divParentObject, 'OverMail', 'logoTitle');
        createElementDiv(divParentObject, '', 'spaseBox');
        createElementImg(divParentObject, 'avatar', 'avatar') // сходить в базу
        createElementP(divParentObject, 'aleksandrnaumenko@mail.ru', 'email');
        createElementImg(divParentObject, 'strelka', 'strelka');
    };
}