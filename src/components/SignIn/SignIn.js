import {
    createElementInputBase,
    createElementButtonBase,
    createElementDiv,
    createElementImg,
} from '../../modules/CreateElement/createElement.js';
import {MainPage} from '../../pages/MainPage/MainPage.js';
import {SignUpRender} from '../../pages/SignUp/SignUp.js';
import {CheckInput} from '../../modules/CheckInput/CheckInput.js';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn.js';
import {LenghtCheck} from '../../modules/LenghtCheck/LenghtCheck.js';

export class SignIn {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    setError(text) {
        document.getElementById('inputEmail').style.borderColor = 'red';
        document.getElementById('inputPassword').style.borderColor = 'red';
        document.getElementsByClassName('invalidMsg')[0].style.visibility = 'visible';
        document.getElementsByClassName('invalidMsg')[0].textContent = text;
    }

    getForm(parent) {
        let email = document.getElementById('inputEmail').value;
        const errEmail = LenghtCheck(email, 'логина');
        if (errEmail !== '') {
            this.setError(errEmail);
            return;
        }

        let password = document.getElementById('inputPassword').value;
        password = CheckInput(password);
        const errPassword = LenghtCheck(password, 'пароля');
        if (errPassword !== '') {
            this.setError(errPassword);
            return;
        }

        const ajaxSignIn = new Ajax();
        ajaxSignIn.promisifyPostSignIn(
            `http://${window.location.hostname}:8080/signin`,
            {
                'email': email,
                'password': password,
            },
        ).then(() => {
            const main = new MainPage(parent);
            main.render();
        }).catch((responseText) => {
            const json = JSON.parse(responseText);
            this.setError(json['message']);
        });
    }

    render() {
        createElementDiv(this.#parent, '', 'container');
        const container = document.getElementsByClassName('container')[0];

        const form = document.createElement('form');
        form.className = 'showbox showboxCenter showboxSelfCenter shadow';
        container.appendChild(form);

        createElementImg(form, 'LogoSigin', 'mb2');
        createElementInputBase(form, 'Логин', 'inputEmail', 'text');
        createElementInputBase(form, 'Пароль', 'inputPassword', 'password');
        createElementDiv(form, 'Не верное имя пользователя или пароль.', 'invalidMsg');
        const invalidMsg = document.getElementsByClassName('invalidMsg')[0];
        invalidMsg.style.visibility = 'hidden';
        createElementDiv(form, '', 'buttonGrid mt4');

        const divParent = document.getElementsByClassName('buttonGrid mt4')[0];
        // let aForm = document.createElement('a');
        // aForm.className = 'forgetPass';
        // aForm.text = 'Забыл пароль';
        // divParent.appendChild(aForm);

        createElementButtonBase(divParent, 'Войти','btn btnPrimary', 'signInButton', 'button');
        createElementButtonBase(divParent, 'Зарегистрироваться','btn btnSecondary', 'registration', 'button');

        const goMenu = document.getElementById('signInButton');
        const goRegistration = document.getElementById('registration');

        goMenu.addEventListener('click', () => {
            this.getForm(this.#parent);
        }); 
        goRegistration.addEventListener('click', () => {
            const signUp = new SignUpRender(this.#parent);
            signUp.render();
        });
    }
}
