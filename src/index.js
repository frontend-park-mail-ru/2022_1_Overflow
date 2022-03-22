import {SignInRender} from './pages/SignIn/SignIn.js';
import {MainPage} from './pages/MainPage/MainPage.js';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn.js';

const root = document.getElementsByTagName('body')[0];


const ajaxGetEmail = new Ajax();
ajaxGetEmail.get(
    `http://${window.location.hostname}:8080/profile`,
    // eslint-disable-next-line
    (status, responseText) => {
        if (status == 401)
        {
            const signIn = new SignInRender(root);
            signIn.render();
        }
        if (status != 200) {
            return ;
        }
        const main = new MainPage(root);
        main.render();
    },
);
