import './SignUp.scss';
import logoSvg from '../image/logoAndTitle.svg';
import {Button} from "../../Ui-kit/Button/Button";
import {Input} from "../../Ui-kit/Input/Input";
import * as signUpMain from './SignUp.hbs'
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {router} from "../../Presenter/Router/Router";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";

export class SignUp<T extends Element> {
    private readonly parent: T;
    private readonly login: string;
    private isLoading: boolean;

    constructor(parent: T, login: string) {
        this.parent = parent;
        this.login = login;
        this.isLoading = false;
    }

    setError = (data: {text: string, type: string}) => {
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
        this.isLoading = false;
    }

    cleanError = (type: string) => {
        const input = document.getElementById(`input${type}`);
        if (!input) {
            return;
        }
        input.classList.remove('inputLError');
        input.classList.add('inputL');

        const error = document.getElementById(`error${type}`) as HTMLDivElement;
        if (!error) {
            return;
        }
        error.style.visibility = 'hidden';
        error.textContent = 'Не верное имя пользователя или пароль';
    }

    submitForm = (handler: (form: {firstName: string, lastName: string, passwordConfirmation: string, password: string, Username: string}) => void) => {
        const form = document.getElementById('formSignUp');
        if (form === null)
            return;

        form.onsubmit = (event) => {
            event.preventDefault();
            if (this.isLoading) {
                return;
            }
            this.isLoading = true;
            this.cleanError('FirstName');
            this.cleanError('LastName');
            this.cleanError('Login');
            this.cleanError('Password');
            this.cleanError('PasswordRepeat');
            handler(this.getForm());
        };
    }

    getForm = () => {
        const firstName: string = (document.getElementById('inputFirstName') as HTMLInputElement).value;
        const lastName: string = (document.getElementById('inputLastName') as HTMLInputElement).value;
        const email: string = (document.getElementById('inputLogin') as HTMLInputElement).value;
        const password: string = (document.getElementById('inputPassword') as HTMLInputElement).value;
        const passwordConfirmation: string = (document.getElementById('inputPasswordRepeat') as HTMLInputElement).value;
        return {firstName: firstName, lastName: lastName, Username: email, password: password, passwordConfirmation: passwordConfirmation};
    }

    render = () => {
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
            router.redirect(urlsRouter.login);
        });
    }
}