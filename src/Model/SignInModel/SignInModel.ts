import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LengthCheckPasswordAndName, LengthCheckUsername} from "../LengthCheck/LengthCheck";
import {checkStatus} from "../CheckStatus/CheckStatus";
import {getCSRFToken} from "../Network/NetworkGet";


export class SignInModel {
    private text: {Username: string, password: string};

    constructor() {
        this.text = {Username: '', password: ''};
    }

    checkInput = async (text: {Username: string, password: string}) => {
        const errLogin = LengthCheckUsername(text.Username, 'логина');
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

    fetchSignIn = async (text: {Username: string, password: string}) => {
        try {
            const header = await getCSRFToken(`http://${window.location.hostname}:8080/signin`);
            const res = await fetch(`http://${window.location.hostname}:8080/signin`, {
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
                eventEmitter.goToMainPage('input', '');
                return;
            }
            const body = await res.json();
            eventEmitter.emit('error', {text: '\n', type: 'Login'});
            eventEmitter.emit('error', {text: checkStatus(body['status'], text.Username), type: 'Password'});
        } catch (e) {
            console.error(e);
        }
    }
}