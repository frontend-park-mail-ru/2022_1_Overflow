import {SignInRender} from '../../../Presenter/pages/SignIn/SignIn';
import {Ajax} from '../../../Model/Network/Ajax';
import {LenghtCheck} from '../../../Model/LenghtCheck/LenghtCheck';
import {MainPage} from '../../../Presenter/pages/MainPage/MainPage';
import './SignUp.css';
import logoSvg from '../../image/LogoSigin.svg';
import {Button} from "../../ui-kit/Button/Button";
import {Input} from "../../ui-kit/Input/Input";
import * as signUpMain from './SignUp.hbs'
import {eventEmitter} from "../../../Presenter/EventEmitter/EventEmitter";

export class SignUp<T extends Element> {
    private readonly parent: T;

    constructor(parent: T) {
        this.parent = parent;
    }

    setError(text: string) {
        const inputFirstName = document.getElementById('inputFirstName');
        const inputLastName = document.getElementById('inputLastName');
        const inputEmail = document.getElementById('inputEmail');
        const inputPassword = document.getElementById('inputPassword');
        const inputPasswordRepeat = document.getElementById('inputPasswordRepeat');
        if (inputFirstName === null || inputLastName === null || inputEmail === null
            || inputPassword === null || inputPasswordRepeat === null) {
            return;
        }
        inputFirstName.style.borderColor = 'red';
        inputLastName.style.borderColor = 'red';
        inputEmail.style.borderColor = 'red';
        inputPassword.style.borderColor = 'red';
        inputPasswordRepeat.style.borderColor = 'red';

        const error: HTMLElement = document.querySelector('.invalidMsg') as HTMLElement
        error.style.visibility = 'visible';
        error.textContent = text;
    }

    submitForm(handler: any) {
        const form = document.getElementById('formSignUp');
        if (form === null)
            return;

        form.onsubmit = (event) => {
            event.preventDefault();
            handler(this.getForm());
        };
    }

    getForm() {
        const firstName: string = (document.getElementById('inputFirstName') as HTMLInputElement).value;
        const lastName: string = (document.getElementById('inputLastName') as HTMLInputElement).value;
        const email: string = (document.getElementById('inputEmail') as HTMLInputElement).value;
        const password: string = (document.getElementById('inputPassword') as HTMLInputElement).value;
        const passwordConfirmation: string = (document.getElementById('inputPasswordRepeat') as HTMLInputElement).value;
        return {firstName: firstName, lastName: lastName, Username: email, password: password, passwordConfirmation: passwordConfirmation};
    }

    render() {
        const firstNameInput = new Input({
            text: 'Имя',
            id: 'inputFirstName',
            type: 'text'
        });

        const lastNameInput = new Input({
            text: 'Фамилия',
            id: 'inputLastName',
            type: 'text'
        });

        const loginInput = new Input({
            text: 'Логин',
            id: 'inputEmail',
            type: 'text'
        });

        const passwordInput = new Input({
            text: 'Пароль',
            id: 'inputPassword',
            type: 'password'
        });

        const passwordRepeatInput = new Input({
            text: 'Повторить пароль',
            id: 'inputPasswordRepeat',
            type: 'password'
        });

        const primBtn = new Button({
            type: 'submit',
            text: 'Создать',
            id: 'signupButton',
            className: 'btn',
        });

        const secBtn = new Button({
            variant: 'Secondary',
            text: 'Назад',
            id: 'backButton',
            className: 'btn',
        });

        const signUp = signUpMain({
            logo: logoSvg,
            firstNameInput: firstNameInput.render(),
            lastNameInput:lastNameInput.render(),
            loginInput: loginInput.render(),
            passwordInput: passwordInput.render(),
            passwordRepeatInput: passwordRepeatInput.render(),
            primBtn: primBtn.render(),
            secBtn: secBtn.render(),
        })

        this.parent.insertAdjacentHTML('beforeend', signUp);

        const goSignIn = document.getElementById('backButton');

        if (goSignIn === null) {
            return;
        }

        goSignIn.addEventListener('click', () => {
            eventEmitter.goToSignIn();
        });
    }
}