import {SignInRender} from './pages/SignIn/SignIn.js';
import {getCookie} from './modules/GetCookie/GetCookie.js';
import {MainPage} from './pages/MainPage/MainPage.js';

const root = document.getElementsByTagName('body')[0];

if (getCookie('OveflowMail') === undefined) {
    const signIn = new SignInRender(root);
    signIn.render();
}
else {
    const main = new MainPage(root);
    main.render();
}
