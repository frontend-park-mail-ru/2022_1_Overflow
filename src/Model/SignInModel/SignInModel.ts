import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LengthCheckPasswordAndName, LengthCheckUsername} from "../LengthCheck/LengthCheck";
import {checkStatus} from "../CheckStatus/CheckStatus";
import {getCSRFToken} from "../Network/NetworkGet";
import {router} from "../../Presenter/Router/Router";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";
import {http} from "../../index";
import {socket} from "../../Presenter/WebSocketMessage/WebSocketMessage";


export class SignInModel {
    private text: {username: string, password: string};

    constructor() {
        this.text = {username: '', password: ''};
    }

    checkInput = async (text: {username: string, password: string}) => {
        const errLogin = LengthCheckUsername(text.username, 'логина');
        if (errLogin !== '') {
            eventEmitter.emit('error', {text: errLogin, type: 'Login'});
        }
        const errPassword = LengthCheckPasswordAndName(text.password, 'пароля');
        if (errPassword !== '') {
            eventEmitter.emit('error', {text: errPassword, type: 'Password'});
        }
        if (errLogin === '' && errPassword === '') {
            await this.fetchSignIn(text);
        }
    }

    fetchSignIn = async (text: {username: string, password: string}) => {
        try {
            const header = await getCSRFToken(`${http}://${window.location.hostname}/api/v1/signin`);
            const res = await fetch(`${http}://${window.location.hostname}/api/v1/signin`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(text),
            });
            if (res.ok) {
                router.redirect(urlsRouter.income);
                socket.init();
                return;
            }
            const body = await res.json();
            eventEmitter.emit('error', {text: '\n', type: 'Login'});
            eventEmitter.emit('error', {text: checkStatus(body['status'], text.username), type: 'Password'});
        } catch (e) {
            console.error(e);
        }
    }
}