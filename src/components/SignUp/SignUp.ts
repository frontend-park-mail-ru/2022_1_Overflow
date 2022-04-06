import {SignInRender} from '../../pages/SignIn/SignIn';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn';
import {LenghtCheck} from '../../modules/LenghtCheck/LenghtCheck';
import {MainPage} from '../../pages/MainPage/MainPage';
import './SignUp.css';
import logoSvg from '../../image/LogoSigin.svg';
import {Button} from "../../ui-kit/Button/Button";
import {Input} from "../../ui-kit/Input/Input";
import * as signUpMain from './SignUp.hbs'

export class SignUp<T extends Element> {
    private readonly parent: T;

    constructor(parent: T) {
        this.parent = parent;
    }

    setError(text: string) {
        document.getElementById('inputFirstName')!.style.borderColor = 'red';
        document.getElementById('inputLastName')!.style.borderColor = 'red';
        document.getElementById('inputEmail')!.style.borderColor = 'red';
        document.getElementById('inputPassword')!.style.borderColor = 'red';
        document.getElementById('inputPasswordRepeat')!.style.borderColor = 'red';
        const error: HTMLElement = document.querySelector('.invalidMsg') as HTMLElement
        error.style.visibility = 'visible';
        document.querySelector('.invalidMsg')!.textContent = text;
    }

    getForm() {
        const firstName: string = (document.getElementById('inputFirstName') as HTMLInputElement).value;
        const errorFirstName = LenghtCheck(firstName, 'имени');
        if (errorFirstName !== '') {
            this.setError(errorFirstName);
            return;
        }

        const lastName: string = (document.getElementById('inputLastName') as HTMLInputElement).value;
        const errorLastName = LenghtCheck(lastName, 'фамилии');
        if (errorLastName !== '') {
            this.setError(errorLastName);
            return;
        }

        const email: string = (document.getElementById('inputEmail') as HTMLInputElement).value;
        const errorEmail = LenghtCheck(email, 'логина');
        if (errorEmail !== '') {
            this.setError(errorEmail);
            return;
        }

        const password: string = (document.getElementById('inputPassword') as HTMLInputElement).value;
        const errorPassword = LenghtCheck(password, 'пароля');
        if (errorPassword !== '') {
            this.setError(errorPassword);
            return;
        }
        const passwordConfirmation: string = (document.getElementById('inputPasswordRepeat') as HTMLInputElement).value;
        const errorPasswordConfirmation = LenghtCheck(passwordConfirmation, 'повтора пароля');
        if (errorPasswordConfirmation !== '') {
            this.setError(errorPasswordConfirmation);
            return;
        }
        if (password !== passwordConfirmation) {
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
                'password_confirmation': passwordConfirmation,
            },
        ).then((data: any) => {
            return ajax.promisifyPostSignIn(
                `http://${window.location.hostname}:8080/signin`,
                {
                    'username': data.username,
                    'password': data.password,
                },
            );
        }).then(() => {
            const main = new MainPage(this.parent);
            main.render();
        }).catch((responseText) => {
            const jsonerror = JSON.parse(responseText);
            this.setError(jsonerror.message);
        });
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

        const form = document.getElementById('formSignUp');
        const goSignIn = document.getElementById('backButton');

        if (form === null || goSignIn === null) {
            return;
        }

        form.onsubmit = (event) => {
            event.preventDefault();
            return this.getForm();
        };

        goSignIn.addEventListener('click', () => {
            const signIn = new SignInRender(this.parent);
            signIn.render();
        });
    }
}