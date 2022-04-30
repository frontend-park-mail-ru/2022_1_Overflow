import {SignInRender} from './Presenter/pages/SignIn/SignIn';
import {MainPage} from './Presenter/pages/MainPage/MainPage';
import {Ajax} from './Model/Network/Ajax';
import './index.css';
import { router } from './Services/router/router';
import { frontUrls } from './Services/router/fronturls';
import { eventEmitter } from './Presenter/EventEmitter/EventEmitter';

export const root = document.getElementsByTagName('body')[0];

router.add(frontUrls.registration, eventEmitter.goToSignUp);
router.add(frontUrls.login, eventEmitter.goToSignIn);
router.add(frontUrls.main, eventEmitter.goToSignIn);
router.add(frontUrls.userProfile, eventEmitter.goToProfile)
router.add(frontUrls.security, eventEmitter.goToSecurity)
router.add(frontUrls.solomessage, eventEmitter.goToSoloMessage)

router.addNotFound(eventEmitter.goToMainPage);

router.start();
const ajaxGetEmail = new Ajax();
ajaxGetEmail.get(
    `http://${window.location.hostname}:8080/profile`,
    // eslint-disable-next-line
    (status: number) => {
        if (status === 401)
        {
            const signIn = new SignInRender(root);
            router.redirect(frontUrls.login)
        }
        if (status !== 200) {
            return ;
        }
        const main = new MainPage(root, 1);
        router.redirect(frontUrls.main)
    },
);
