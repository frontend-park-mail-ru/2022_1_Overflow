import {
    createElementInputBase,
    createElementButtonBase,
    createElementDiv,
    createElementP,
    createElementImg,
} from "../../modules/CreateElement/createElement.js"

export class SignIn {
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
        createElementInputBase(form, 'Почта', 'inputEmail', 'text');
        createElementInputBase(form, 'Пароль', 'inputPassword', 'password');
        createElementDiv(form, 'Не верное имя пользователя или пароль.', 'invalidMsg');
        createElementDiv(form, '', 'buttonGrid mt4');
        let divParent = document.getElementsByClassName('buttonGrid mt4')[0];
        let aForm = document.createElement('a');
        aForm.className = 'forgetPass';
        aForm.text = 'Забыл пароль';
        divParent.appendChild(aForm);
        createElementButtonBase(divParent, 'Войти','btn btnPrimary', 'signupButton', 'submit');
        createElementButtonBase(divParent, 'Зарегистрироваться','btn btnSecondary', 'backButton', 'button');
    };
}