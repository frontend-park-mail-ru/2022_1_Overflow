import {SignInRender} from './pages/SignIn/SignIn.js';
import {getCookie} from './modules/GetCookie/GetCookie.js';
import {MainPage} from './pages/MainPage/MainPage.js';
import {Ajax} from './modules/AjaxSignIn/AjaxSignIn.js';

const root = document.getElementsByTagName('body')[0];

if (getCookie('email') === undefined || getCookie('password')=== undefined) {
    const signIn = new SignInRender(root);
    signIn.render();
}
else {
    const email = getCookie('email');
    const password = getCookie('password');
    const ajaxSignIn = new Ajax();
    ajaxSignIn.post(
        ':8080/signin',
        (status, responseText) => {
            if (status != 200) {
                const signIn = new SignInRender(root);
                signIn.render();
                return;
            }

            const parsed = JSON.parse(responseText);

            if (parsed['status'] == 0) {
                const main = new MainPage(root);
                main.render();
            }
            else {
                const signIn = new SignInRender(root);
                signIn.render();
            }
        },
        {
            'email': email,
            'password': password,
        },
    );
}

