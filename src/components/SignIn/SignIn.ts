import {MainPage} from '../../pages/MainPage/MainPage';
import {SignUpRender} from '../../pages/SignUp/SignUp';
import {CheckInput} from '../../modules/CheckInput/CheckInput';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn';
import {LenghtCheck} from '../../modules/LenghtCheck/LenghtCheck';
import './SignIn.css';
import logoSvg from '../../image/Logo.svg';
import {Button} from "../../ui-kit/Button/Button";
import {Input} from "../../ui-kit/Input/Input";
import * as signInMain from './SignIn.hbs';

export class SignIn<T extends Element> {
    private readonly parent : T;

    constructor(parent: T) {
        this.parent = parent;
    }

    setError(text: string) {
        document.getElementById('inputEmail')!.style.borderColor = 'red';
        document.getElementById('inputPassword')!.style.borderColor = 'red';
        const error: HTMLElement = document.querySelector('.invalidMsg') as HTMLElement
        error.style.visibility = 'visible';
        error.textContent = text;
    }

    getForm(parent: Element) {
        const email: string = (document.getElementById('inputEmail') as HTMLInputElement).value;
        const errEmail = LenghtCheck(email, 'логина');
        if (errEmail !== '') {
            this.setError(errEmail);
            return;
        }

        let password : string = (document.getElementById('inputPassword') as HTMLInputElement).value;
        password = CheckInput(password);
        const errPassword : string = LenghtCheck(password, 'пароля');
        if (errPassword !== '') {
            this.setError(errPassword);
            return;
        }

        const ajaxSignIn = new Ajax();
        ajaxSignIn.promisifyPostSignIn(
            `http://${window.location.hostname}:8080/signin`,
            {
                'username': email,
                'password': password,
            },
        ).then(() => {
            const main = new MainPage(parent);
            main.render();
            return true;
        }).catch((responseText: string) => {
            const json = JSON.parse(responseText);
            this.setError(json.message);
            return false;
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
        })

        this.parent.insertAdjacentHTML('beforeend', signIn);

        const goRegistration = document.getElementById('registration');
        const form = document.getElementById('formSignIn');

        if (form === null)
            return;

        form.onsubmit = (event) => {
            event.preventDefault();
            return this.getForm(this.parent);
        };

        goRegistration!.addEventListener('click', () => {
            const signUp = new SignUpRender(this.parent);
            signUp.render();
        });
    }
}
