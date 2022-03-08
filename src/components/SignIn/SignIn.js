import {
    createElementInputBase,
    createElementButtonBase,
    createElementDiv,
    createElementImg,
} from "../../modules/CreateElement/createElement.js"
import {MainPage} from '../../pages/MainPage/MainPage.js';
import {SignUpRender} from '../../pages/SignUp/SignUp.js';
import {CheckInput} from "../../modules/CheckInput/CheckInput.js";

export class SignIn {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    getForm() {
        let invalidMsg = document.getElementsByClassName('invalidMsg')[0];
        let email = document.getElementById('inputEmail').value;
        email = CheckInput(email);
        let password = document.getElementById('inputPassword').value;
        password = CheckInput(password);
        if (email === '123' && password === '123') {
            return true;
        }
        document.getElementById('inputPassword').value = '';
        document.getElementById('inputEmail').value = '';
        invalidMsg.style.visibility = 'visible';
        return false;
    }

    render() {
        createElementDiv(this.#parent, '', 'container');
        let container = document.getElementsByClassName('container')[0];

        let form = document.createElement('form');
        form.className = 'showbox showboxCenter showboxSelfCenter shadow';
        container.appendChild(form);

        createElementImg(form, 'LogoSigin', 'mb2');
        createElementInputBase(form, 'Почта', 'inputEmail', 'text');
        createElementInputBase(form, 'Пароль', 'inputPassword', 'password');
        createElementDiv(form, 'Не верное имя пользователя или пароль.', 'invalidMsg');
        let invalidMsg = document.getElementsByClassName('invalidMsg')[0];
        invalidMsg.style.visibility = 'hidden';
        createElementDiv(form, '', 'buttonGrid mt4');

        let divParent = document.getElementsByClassName('buttonGrid mt4')[0];
        // let aForm = document.createElement('a');
        // aForm.className = 'forgetPass';
        // aForm.text = 'Забыл пароль';
        // divParent.appendChild(aForm);

        createElementButtonBase(divParent, 'Войти','btn btnPrimary', 'signInButton', 'button');
        createElementButtonBase(divParent, 'Зарегистрироваться','btn btnSecondary', 'registration', 'button');

        let goMenu = document.getElementById('signInButton');
        let goRegistration = document.getElementById('registration');

        goMenu.addEventListener('click', () => {
            if (this.getForm() === true){
                let mainPage = new MainPage(this.#parent);
                mainPage.render();
            }
        })
        goRegistration.addEventListener('click', () => {
            let signUp = new SignUpRender(this.#parent);
            signUp.render();
        })
    };
}