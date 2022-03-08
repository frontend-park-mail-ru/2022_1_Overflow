import {
    createElementInputBase,
    createElementButtonBase,
    createElementDiv,
    createElementP,
    createElementImg,
} from "../../modules/CreateElement/createElement.js"
import {MainPage} from '../../pages/MainPage/MainPage.js';
import {SignUpRender} from '../../pages/SignUp/SignUp.js';

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
        createElementButtonBase(divParent, 'Войти','btn btnPrimary', 'signInButton', 'submit');
        createElementButtonBase(divParent, 'Зарегистрироваться','btn btnSecondary', 'registration', 'button');
        let goMenu = document.getElementById('signInButton');
        let goRegistration = document.getElementById('registration');
        goMenu.addEventListener('click', () => {
            let mainPage = new MainPage(this.#parent);
            mainPage.render();
        })
        goRegistration.addEventListener('click', () => {
            let signUp = new SignUpRender(this.#parent);
            signUp.render();
        })
    };
}