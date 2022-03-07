import {TextAndClass} from '../../ui-kit/TextAndClass/TextAndClass.js';
import {ImageAndClass} from '../../ui-kit/ImageAndClass/ImageAndClass.js';
import {DiveAndClass} from "../../ui-kit/DivAndClass/DiveAndClass.js";

export class Header {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        let head = document.createElement('header');
        this.#parent.appendChild(head);

        let divParent = new DiveAndClass(head)
        divParent.class = 'parentHead';
        divParent.data = '';
        divParent.render();
        let divParentObject = document.getElementsByClassName('parentHead')[0]

        let icon = new ImageAndClass(divParentObject);
        icon.class = 'logoLogo';
        icon.data = 'Logo';
        icon.render();

        let logoText = new TextAndClass(divParentObject);
        logoText.class = 'logoTitle';
        logoText.data = 'OverMail';
        logoText.render();

        let divClear = new DiveAndClass(divParentObject);
        divClear.class = 'spaseBox';
        divClear.data = '';
        divClear.render();

        let avatar = new ImageAndClass(divParentObject);
        avatar.class = 'avatar';
        avatar.data = 'avatar'; // сходить в базу
        avatar.render();

        let textEmail = new TextAndClass(divParentObject);
        textEmail.class = 'email';
        textEmail.data = 'aleksandrnaumenko@mail.ru'; //сходить в базу
        textEmail.render();

        let strelka = new ImageAndClass(divParentObject);
        strelka.class = 'strelka';
        strelka.data = 'strelka';
        strelka.render();
    };
}