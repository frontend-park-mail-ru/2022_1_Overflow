import './SignIn.scss';
import logoSvg from '../image/Logo.svg';
import {Button} from "../../ui-kit/Button/Button";
import {Input} from "../../ui-kit/Input/Input";
import * as signInMain from './SignIn.hbs';
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";

export class SignIn<T extends Element> {
    private readonly parent : T;

    constructor(parent: T) {
        this.parent = parent;
    }

    setError(text: string) {
        const inputEmail = document.getElementById('inputEmail');
        const inputPassword = document.getElementById('inputPassword');

        if (inputEmail === null || inputPassword === null) {
            return;
        }

        inputEmail.classList.remove('inputL');
        inputEmail.classList.add('inputLError');
        inputPassword.classList.remove('inputL');
        inputPassword.classList.add('inputLError');

        const error = document.querySelector('.invalidMsg') as HTMLElement;
        error.style.visibility = 'visible';
        error.textContent = text;
    }

    getForm() {
        const Username: string = (document.getElementById('inputEmail') as HTMLInputElement).value;
        const password : string = (document.getElementById('inputPassword') as HTMLInputElement).value;
        return {Username: Username, password: password};
    }

    submitForm(handler: any) {
        const form = document.getElementById('formSignIn');
        if (form === null)
            return;

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            await handler(this.getForm());
        });
    }

    render() {
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

        const primBtn = new Button({
            type: 'submit',
            text: 'Войти',
            id: 'signInButton',
            className: 'btn'
        });

        const secBtn = new Button({
            variant: 'Secondary',
            text: 'Зарегистрироваться',
            id: 'registration',
            className: 'btn',
        });

        const signIn = signInMain({
            logo: logoSvg,
            loginInput: loginInput.render(),
            passwordInput: passwordInput.render(),
            primBtn: primBtn.render(),
            secBtn: secBtn.render(),
        });

        this.parent.insertAdjacentHTML('beforeend', signIn);

        const goRegistration = document.getElementById('registration');

        if (goRegistration === null) {
            return;
        }

        goRegistration.addEventListener('click', () => {
            eventEmitter.goToSignUp();
        });
    }
}
