import './SignUp.scss';
import logoSvg from '../image/logoAndTitle.svg';
import {Button} from "../../ui-kit/Button/Button";
import {Input} from "../../ui-kit/Input/Input";
import * as signUpMain from './SignUp.hbs'
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";

export class SignUp<T extends Element> {
    private readonly parent: T;
    private readonly login: string;

    constructor(parent: T, login: string) {
        this.parent = parent;
        this.login = login;
    }

    setError(data: {text: string, type: string}) {
        const input = document.getElementById(`input${data.type}`);
        if (!input) {
            return;
        }
        input.classList.remove('inputL');
        input.classList.add('inputLError');

        const error = document.getElementById(`error${data.type}`) as HTMLDivElement;
        if (!error) {
            return;
        }
        error.style.visibility = 'visible';
        error.textContent = data.text;
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
        const email: string = (document.getElementById('inputLogin') as HTMLInputElement).value;
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
            id: 'inputLogin',
            type: 'text',
            realText: this.login,
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