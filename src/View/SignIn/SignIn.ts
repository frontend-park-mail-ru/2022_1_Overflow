import './SignIn.scss';
import logoSvg from '../image/logoAndTitle.svg';
import {Button} from "../../Ui-kit/Button/Button";
import {Input} from "../../Ui-kit/Input/Input";
import * as signInMain from './SignIn.hbs';
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {router} from "../../Presenter/Router/Router";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";

export class SignIn<T extends Element> {
    private readonly parent : T;
    private isLoading: boolean;

    constructor(parent: T) {
        this.parent = parent;
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

    getForm = () => {
        const username: string = (document.getElementById('inputLogin') as HTMLInputElement).value;
        const password : string = (document.getElementById('inputPassword') as HTMLInputElement).value;
        return {username, password};
    }

    submitForm = (handler: (form: {password: string, username: string}) => void) => {
        const form = document.getElementById('formSignIn');
        if (form === null)
            return;
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (this.isLoading) {
                return;
            }

            this.isLoading = true;
            this.cleanError('Login');
            this.cleanError('Password');
            await handler(this.getForm());
        });
    }

    render = () => {
        const loginInput = new Input({
            text: 'Логин',
            id: 'inputLogin',
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
        if (!goRegistration) {
            return;
        }

        goRegistration.addEventListener('click', () => {
            const Username: string = (document.getElementById('inputLogin') as HTMLInputElement).value;
            if (Username) {
                router.redirect(urlsRouter.registration, 'Регистрация', {Username});
            } else {
                router.redirect(urlsRouter.registration, 'Регистрация');
            }
        });
    }
}
