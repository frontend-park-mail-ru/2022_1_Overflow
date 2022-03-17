import {
    createElementInputBase,
    createElementButtonBase,
    createElementDiv,
    createElementImg,
} from '../../modules/CreateElement/createElement.js';
import {SignInRender} from '../../pages/SignIn/SignIn.js';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn.js';
import {LenghtCheck} from '../../modules/LenghtCheck/LenghtCheck.js';

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
        document.getElementsByClassName('invalidMsg')[0].style.visibility = 'visible';
        document.getElementsByClassName('invalidMsg')[0].textContent = text;
    }

    getForm() {
        let firstName = document.getElementById('inputFirstName').value;
        const errorFirstName = LenghtCheck(firstName, 'Имени');
        if (errorFirstName !== '') {
            this.setError(errorFirstName);
            return;
        }

        let lastName = document.getElementById('inputLastName').value;
        const errorLastName = LenghtCheck(lastName, 'Фамилии');
        if (errorLastName !== '') {
            this.setError(errorLastName);
            return;
        }

        let email = document.getElementById('inputEmail').value;
        const errorEmail = LenghtCheck(email, 'Почты');
        if (errorEmail !== '') {
            this.setError(errorEmail);
            return;
        }

        let password = document.getElementById('inputPassword').value;
        const errorPassword = LenghtCheck(password, 'Пароля');
        if (errorPassword !== '') {
            this.setError(errorPassword);
            return;
        }
        let password_confirmation = document.getElementById('inputPasswordRepeat').value;
        const errorPassword_confirmation = LenghtCheck(password_confirmation, 'Повтора пароля');
        if (errorPassword_confirmation !== '') {
            this.setError(errorPassword_confirmation);
            return;
        }
        if (password !== password_confirmation) {
            this.setError('Поля пароля и повтора пароля не совпадают');
            return;
        }

        const ajaxSignIn = new Ajax();
        ajaxSignIn.post(
            `http://${window.location.hostname}:8080/signup`,
            (status, responseText) => {
                if (status != 200) {
                    return;
                }
                const parsed = JSON.parse(responseText);
                if (parsed['status'] == 0) {
                    const signIn = new SignInRender(this.#parent);
                    signIn.render();
                } else {
                    document.getElementById('inputFirstName').style.borderColor = 'red';
                    document.getElementById('inputLastName').style.borderColor = 'red';
                    document.getElementById('inputEmail').style.borderColor = 'red';
                    document.getElementById('inputPassword').style.borderColor = 'red';
                    document.getElementById('inputPasswordRepeat').style.borderColor = 'red';
                    document.getElementsByClassName('invalidMsg')[0].style.visibility = 'visible';
                    document.getElementsByClassName('invalidMsg')[0].textContent = parsed['message'];
                }
            },
            {
                'first_name': firstName,
                'last_name': lastName,
                'email': email,
                'password': password,
                'password_confirmation': password_confirmation,
            },
        );
    }

    render() {
        createElementDiv(this.#parent, '', 'container');
        const container = document.getElementsByClassName('container')[0];
        const form = document.createElement('form');
        form.className = 'showbox showboxCenter showboxSelfCenter shadow';
        container.appendChild(form);
        createElementImg(form, 'LogoSigin', 'mb2');
        createElementInputBase(form, 'Имя', 'inputFirstName', 'text');
        createElementInputBase(form, 'Фамилия', 'inputLastName', 'text');
        createElementInputBase(form, 'Почта', 'inputEmail', 'text');
        createElementInputBase(form, 'Пароль', 'inputPassword', 'password');
        createElementInputBase(form, 'Повторить пароль', 'inputPasswordRepeat', 'password');
        createElementDiv(form, 'Не верное имя пользователя или пароль.', 'invalidMsg');
        const invalidMsg = document.getElementsByClassName('invalidMsg')[0];
        invalidMsg.style.visibility = 'hidden';
        createElementDiv(form, '', 'buttonGrid mt4');
        const divParent = document.getElementsByClassName('buttonGrid mt4')[0];
        createElementButtonBase(divParent, 'Создать', 'btn btnPrimary', 'signupButton', 'button');
        createElementButtonBase(divParent, 'Назад', 'btn btnSecondary', 'backButton', 'button');
        const goSignIn = document.getElementById('backButton');
        const goMenu = document.getElementById('signupButton');

        goMenu.addEventListener('click', () => {
            this.getForm();
        });

        goSignIn.addEventListener('click', () => {
            const signIn = new SignInRender(this.#parent);
            signIn.render();
        });
    }
}