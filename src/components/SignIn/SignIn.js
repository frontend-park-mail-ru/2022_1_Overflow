import {
    createElementInputBase,
    createElementButtonBase,
    createElementDiv,
    createElementImg,
} from '../../modules/CreateElement/createElement.js';
import {MainPage} from '../../pages/MainPage/MainPage.js';
import {SignUpRender} from '../../pages/SignUp/SignUp.js';
import {CheckInput} from '../../modules/CheckInput/CheckInput.js';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn.js';

export class SignIn {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    getForm(parent) {
        let email = document.getElementById('inputEmail').value;
        email = CheckInput(email);
        let password = document.getElementById('inputPassword').value;
        password = CheckInput(password);

        const ajaxSignIn = new Ajax();
        ajaxSignIn.post(
            `http://${window.location.hostname}:8080/signin',
            (status, responseText) => {
                if (status != 200) {
                    return;
                }
        
                const parsed = JSON.parse(responseText);
                if (parsed['status'] == 0) {
                    const main = new MainPage(parent);
                    main.render();
                }
                else {
                    document.getElementById('inputEmail').style.borderColor = 'red';
                    document.getElementById('inputPassword').style.borderColor = 'red';
                    document.getElementsByClassName('invalidMsg')[0].style.visibility = 'visible';
                    document.getElementsByClassName('invalidMsg')[0].textContent = parsed['message'];
                }
            },
            {
                'email': email,
                'password': password,
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
        createElementInputBase(form, 'Почта', 'inputEmail', 'text');
        createElementInputBase(form, 'Пароль', 'inputPassword', 'password');
        createElementDiv(form, 'Не верное имя пользователя или пароль.', 'invalidMsg');
        const invalidMsg = document.getElementsByClassName('invalidMsg')[0];
        invalidMsg.style.visibility = 'hidden';
        createElementDiv(form, '', 'buttonGrid mt4');

        const divParent = document.getElementsByClassName('buttonGrid mt4')[0];
        // let aForm = document.createElement('a');
        // aForm.className = 'forgetPass';
        // aForm.text = 'Забыл пароль';
        // divParent.appendChild(aForm);

        createElementButtonBase(divParent, 'Войти','btn btnPrimary', 'signInButton', 'button');
        createElementButtonBase(divParent, 'Зарегистрироваться','btn btnSecondary', 'registration', 'button');

        const goMenu = document.getElementById('signInButton');
        const goRegistration = document.getElementById('registration');

        goMenu.addEventListener('click', () => {
            this.getForm(this.#parent);
        }); 
        goRegistration.addEventListener('click', () => {
            const signUp = new SignUpRender(this.#parent);
            signUp.render();
        });
    }
}