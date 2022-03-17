import {SignInRender} from './pages/SignIn/SignIn.js';
import {getCookie} from './modules/GetCookie/GetCookie.js';
import {MainPage} from './pages/MainPage/MainPage.js';
import {Ajax} from './modules/AjaxSignIn/AjaxSignIn.js';

const root = document.getElementsByTagName('body')[0];

console.log(getCookie('OveflowMail'));

if (getCookie('OveflowMail') === undefined) {
    const signIn = new SignInRender(root);
    signIn.render();
}
else {
    const main = new MainPage(root);
    main.render();
}
