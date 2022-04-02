import {
    createElementInputBase,
    createElementButtonBase,
    createElementDiv,
    createElementImg,
} from '../../modules/CreateElement/createElement';
import {SignInRender} from '../../pages/SignIn/SignIn';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn';
import {LenghtCheck} from '../../modules/LenghtCheck/LenghtCheck';
import {MainPage} from '../../pages/MainPage/MainPage';
import './SignUp.css';
import logoSvg from '../../image/LogoSigin.svg';

export class SignUp {
    parent: Element;

    constructor(parent: Element) {
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

        const lastName : string = (document.getElementById('inputLastName') as HTMLInputElement).value;
        const errorLastName = LenghtCheck(lastName, 'фамилии');
        if (errorLastName !== '') {
            this.setError(errorLastName);
            return;
        }

        const email : string = (document.getElementById('inputEmail') as HTMLInputElement).value;
        const errorEmail = LenghtCheck(email, 'логина');
        if (errorEmail !== '') {
            this.setError(errorEmail);
            return;
        }

        const password : string = (document.getElementById('inputPassword') as HTMLInputElement).value;
        const errorPassword = LenghtCheck(password, 'пароля');
        if (errorPassword !== '') {
            this.setError(errorPassword);
            return;
        }
        const passwordConfirmation : string = (document.getElementById('inputPasswordRepeat') as HTMLInputElement).value;
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
        createElementDiv(this.parent, '', 'container');
        const container = document.querySelector('.container');
        const form = document.createElement('form');
        form.onsubmit = (event) => {
            event.preventDefault();
            return this.getForm();
        };
        form.className = 'showbox showboxCenter showboxSelfCenter shadow';
        container!.appendChild(form);

        createElementImg(form, 'LogoSigin', logoSvg, 'mb2');
        createElementInputBase(form, 'Имя', 'inputFirstName', 'text');
        createElementInputBase(form, 'Фамилия', 'inputLastName', 'text');
        createElementInputBase(form, 'Логин', 'inputEmail', 'text');
        createElementInputBase(form, 'Пароль', 'inputPassword', 'password');
        createElementInputBase(form, 'Повторить пароль', 'inputPasswordRepeat', 'password');
        createElementDiv(form, 'Не верное имя пользователя или пароль.', 'invalidMsg');
        const invalidMsg = document.querySelector('.invalidMsg') as HTMLElement;
        invalidMsg.style.visibility = 'hidden';
        createElementDiv(form, '', 'buttonGrid mt4');
        const divParent = document.getElementsByClassName('buttonGrid mt4')[0];
        createElementButtonBase(divParent, 'Создать', 'btn btnPrimary', 'signupButton', 'submit');
        createElementButtonBase(divParent, 'Назад', 'btn btnSecondary', 'backButton', 'button');
        const goSignIn = document.getElementById('backButton');

        goSignIn!.addEventListener('click', () => {
            const signIn = new SignInRender(this.parent);
            signIn.render();
        });
    }
}