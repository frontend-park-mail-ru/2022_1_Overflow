import {SignInRender} from './Presenter/pages/SignIn/SignIn';
import {MainPage} from './Presenter/pages/MainPage/MainPage';
import {Ajax} from './Model/Network/Ajax';
import './index.css';

const root = document.getElementsByTagName('body')[0];

const ajaxGetEmail = new Ajax();
ajaxGetEmail.get(
    `http://${window.location.hostname}:8080/profile`,
    // eslint-disable-next-line
    (status: number) => {
        if (status === 401)
        {
            console.log('1');
            const signIn = new SignInRender(root);
            signIn.render();
        }
        if (status !== 200) {
            return ;
        }
        console.log('2');
        const main = new MainPage(root, 1);
        main.render();
    },
);
