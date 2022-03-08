import {
    createElementInputBase,
    createElementButtonBase,
    createElementDiv,
    createElementImg,
} from '../../modules/CreateElement/createElement.js';
import {SignInRender} from '../../pages/SignIn/SignIn.js';
import {MainPage} from '../../pages/MainPage/MainPage.js';
import {safe} from '../../modules/Safe/safe.js';

export class SignUp {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    getForm() {
        //накрутить проверок
        let name = document.getElementById('inputFirstName').value;
        let password = document.getElementById('inputPassword').value;
        password = safe(password);
        if (name === '2' && password === '2') {
            return true;
        }
        const invalidMsg = document.getElementsByClassName('invalidMsg')[0];
        document.getElementById('inputPassword').value = '';
        document.getElementById('inputEmail').value = '';
        invalidMsg.style.visibility = 'visible';
        return false;
    }

    render() {
        createElementDiv(this.#parent, '', 'container');
        const container = document.getElementsByClassName('container')[0];
        const form = document.createElement('form');
        form.className = 'showbox showboxCenter showboxSelfCenter shadow';
        container.appendChild(form);
        createElementImg(form, 'LogoSigin', 'mb2');
        createElementInputBase(form, 'Имя', 'inputFirstName', 'text');
        createElementInputBase(form, 'Фамилия', 'inputLastName', 'text');
        createElementInputBase(form, 'Почта', 'inputEmail', 'text');
        createElementInputBase(form, 'Пароль', 'inputPassword', 'password');
        createElementInputBase(form, 'Повторить пароль', 'inputPasswordRepeat', 'password');
        createElementDiv(form, 'Не верное имя пользователя или пароль.', 'invalidMsg');
        const invalidMsg = document.getElementsByClassName('invalidMsg')[0];
        invalidMsg.style.visibility = 'hidden';
        createElementDiv(form, '', 'buttonGrid mt4');
        const divParent = document.getElementsByClassName('buttonGrid mt4')[0];
        createElementButtonBase(divParent, 'Создать','btn btnPrimary', 'signupButton', 'button');
        createElementButtonBase(divParent, 'Назад','btn btnSecondary', 'backButton', 'button');
        const goSignIn = document.getElementById('backButton');
        const goMenu = document.getElementById('signupButton');
        goMenu.addEventListener('click', () => {
            if (this.getForm() === true){
                const mainPage = new MainPage(this.#parent);
                mainPage.render();
            }
        });
        goSignIn.addEventListener('click', () => {
            const signUp = new SignInRender(this.#parent);
            signUp.render();
        });
    }
}