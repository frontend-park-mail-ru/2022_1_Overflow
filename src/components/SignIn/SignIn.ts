import {
    createElementInputBase,
    createElementButtonBase,
    createElementDiv,
    createElementImg,
} from '../../modules/CreateElement/createElement.js';
import {MainPage} from '../../pages/MainPage/MainPage.js';
import {SignUpRender} from '../../pages/SignUp/SignUp.js';
import {CheckInput} from '../../modules/CheckInput/CheckInput';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn.js';
import {LenghtCheck} from '../../modules/LenghtCheck/LenghtCheck.js';

export class SignIn {
    private readonly parent;

    constructor(parent: Element) {
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
        const email: string | null = document.getElementById('inputEmail')!.textContent;
        const errEmail = LenghtCheck(email, 'логина');
        if (errEmail !== '') {
            this.setError(errEmail);
            return;
        }

        let password = document.getElementById('inputPassword')!.textContent;
        password = CheckInput(password);
        const errPassword = LenghtCheck(password, 'пароля');
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
        createElementDiv(this.parent, '', 'container');
        const container = document.querySelector('.container');

        const form = document.createElement('form');
        form.className = 'showbox showboxCenter showboxSelfCenter shadow';
        form.onsubmit = (event) => {
            event.preventDefault();
            return this.getForm(this.parent);
        };
        container!.appendChild(form);

        createElementImg(form, 'LogoSigin', 'mb2');
        createElementInputBase(form, 'Логин', 'inputEmail', 'text');
        createElementInputBase(form, 'Пароль', 'inputPassword', 'password');
        createElementDiv(form, 'Не верное имя пользователя или пароль.', 'invalidMsg');
        const invalidMsg = document.querySelector('.invalidMsg') as HTMLElement;
        invalidMsg!.style.visibility = 'hidden';
        createElementDiv(form, '', 'buttonGrid mt4');

        const divParent = document.getElementsByClassName('buttonGrid mt4')[0];
        // let aForm = document.createElement('a');
        // aForm.className = 'forgetPass';
        // aForm.text = 'Забыл пароль';
        // divParent.appendChild(aForm);

        createElementButtonBase(divParent, 'Войти','btn btnPrimary', 'signInButton', 'submit');
        createElementButtonBase(divParent, 'Зарегистрироваться','btn btnSecondary', 'registration', 'button');

        const goRegistration = document.getElementById('registration');

        goRegistration!.addEventListener('click', () => {
            const signUp = new SignUpRender(this.parent);
            signUp.render();
        });
    }
}
