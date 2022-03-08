import {
    createElementInputBase,
    createElementButtonBase,
    createElementDiv,
    createElementP,
    createElementImg,
} from "../../modules/CreateElement/createElement.js"

export class SignUp {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        createElementDiv(this.#parent, '', 'container');
        let container = document.getElementsByClassName('container')[0];
        let form = document.createElement('form');
        form.className = 'showbox showboxCenter showboxSelfCenter shadow';
        container.appendChild(form);
        createElementImg(form, 'LogoSigin', 'mb2');
        createElementInputBase(form, 'Имя', 'inputFirstName', 'text');
        createElementInputBase(form, 'Фамилия', 'inputLastName', 'text');
        createElementInputBase(form, 'Почта', 'inputEmail', 'text');
        createElementInputBase(form, 'Пароль', 'inputPassword', 'password');
        createElementInputBase(form, 'Повторить пароль', 'inputPasswordRepeat', 'password');
        createElementDiv(form, 'Не верное имя пользователя или пароль.', 'invalidMsg');
        createElementDiv(form, '', 'buttonGrid mt4');
        let divParent = document.getElementsByClassName('buttonGrid mt4')[0];
        createElementButtonBase(divParent, 'Создать','btn btnPrimary', 'signupButton', 'submit');
        createElementButtonBase(divParent, 'Назад','btn btnSecondary', 'backButton', 'button');
    };
}