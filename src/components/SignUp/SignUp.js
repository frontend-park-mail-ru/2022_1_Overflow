import {
    createElementInputBase,
    createElementButtonBase,
    createElementDiv,
    createElementImg,
} from '../../modules/CreateElement/createElement.js';
import {SignInRender} from '../../pages/SignIn/SignIn.js';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn.js';
import {LenghtCheck} from '../../modules/LenghtCheck/LenghtCheck.js';
import {MainPage} from '../../pages/MainPage/MainPage.js';

export class SignUp {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    setError(text) {
        document.getElementById('inputFirstName').style.borderColor = 'red';
        document.getElementById('inputLastName').style.borderColor = 'red';
        document.getElementById('inputEmail').style.borderColor = 'red';
        document.getElementById('inputPassword').style.borderColor = 'red';
        document.getElementById('inputPasswordRepeat').style.borderColor = 'red';
        document.querySelector('.invalidMsg').style.visibility = 'visible';
        document.querySelector('.invalidMsg').textContent = text;
    }

    getForm() {
        let firstName = document.getElementById('inputFirstName').value;
        const errorFirstName = LenghtCheck(firstName, 'имени');
        if (errorFirstName !== '') {
            this.setError(errorFirstName);
            return;
        }

        let lastName = document.getElementById('inputLastName').value;
        const errorLastName = LenghtCheck(lastName, 'фамилии');
        if (errorLastName !== '') {
            this.setError(errorLastName);
            return;
        }

        let email = document.getElementById('inputEmail').value;
        const errorEmail = LenghtCheck(email, 'логина');
        if (errorEmail !== '') {
            this.setError(errorEmail);
            return;
        }

        let password = document.getElementById('inputPassword').value;
        const errorPassword = LenghtCheck(password, 'пароля');
        if (errorPassword !== '') {
            this.setError(errorPassword);
            return;
        }
        let password_confirmation = document.getElementById('inputPasswordRepeat').value;
        const errorPassword_confirmation = LenghtCheck(password_confirmation, 'повтора пароля');
        if (errorPassword_confirmation !== '') {
            this.setError(errorPassword_confirmation);
            return;
        }
        if (password !== password_confirmation) {
            this.setError('Поля пароля и повтора пароля не совпадают.');
            return;
        }

        const ajax = new Ajax();
        ajax.promisifyPostSignUp(
            `http://${window.location.hostname}:8080/signup`,
            {
                'first_name': firstName,
                'last_name': lastName,
                'username': email,
                'password': password,
                'password_confirmation': password_confirmation,
            },
        ).then((data) => {
            return ajax.promisifyPostSignIn(
                `http://${window.location.hostname}:8080/signin`,
                {
                    'username': data['username'],
                    'password': data['password'],
                },
            );
        }).then(() => {
            const main = new MainPage(this.#parent);
            main.render();
        }).catch((responseText) => {
            const jsonerror = JSON.parse(responseText);
            this.setError(jsonerror['message']);
        });
    }

    render() {
        createElementDiv(this.#parent, '', 'container');
        const container = document.querySelector('.container');
        const form = document.createElement('form');
        form.onsubmit = (event) => {
            event.preventDefault();
            return this.getForm(this.#parent);
        };
        form.className = 'showbox showboxCenter showboxSelfCenter shadow';
        container.appendChild(form);

        createElementImg(form, 'LogoSigin', 'mb2');
        createElementInputBase(form, 'Имя', 'inputFirstName', 'text');
        createElementInputBase(form, 'Фамилия', 'inputLastName', 'text');
        createElementInputBase(form, 'Логин', 'inputEmail', 'text');
        createElementInputBase(form, 'Пароль', 'inputPassword', 'password');
        createElementInputBase(form, 'Повторить пароль', 'inputPasswordRepeat', 'password');
        createElementDiv(form, 'Не верное имя пользователя или пароль.', 'invalidMsg');
        const invalidMsg = document.querySelector('.invalidMsg');
        invalidMsg.style.visibility = 'hidden';
        createElementDiv(form, '', 'buttonGrid mt4');
        const divParent = document.getElementsByClassName('buttonGrid mt4')[0];
        createElementButtonBase(divParent, 'Создать', 'btn btnPrimary', 'signupButton', 'submit');
        createElementButtonBase(divParent, 'Назад', 'btn btnSecondary', 'backButton', 'button');
        const goSignIn = document.getElementById('backButton');

        goSignIn.addEventListener('click', () => {
            const signIn = new SignInRender(this.#parent);
            signIn.render();
        });
    }
}