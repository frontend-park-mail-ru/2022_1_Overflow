import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LengthCheckPasswordAndName, LengthCheckUsername} from "../LengthCheck/LengthCheck";
import {checkStatus} from "../CheckStatus/CheckStatus";


export class SignInModel {
    private text: {Username: string, password: string};

    constructor() {
        this.text = {Username: '', password: ''};
    }

    checkInput = async (text: {Username: string, password: string}) => {
        const errLogin = LengthCheckUsername(text.Username, 'логина');
        if (errLogin !== '') {
            eventEmitter.emit('error', errLogin);
            return;
        }
        const errPassword = LengthCheckPasswordAndName(text.password, 'пароля');
        if (errPassword !== '') {
            eventEmitter.emit('error', errPassword);
            return;
        }
        await this.fetchSignIn(text);
    }

    fetchSignIn = async (text: {Username: string, password: string}) => {
        const response = await fetch(`http://${window.location.hostname}:8080/signin`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        try {
            const res = await fetch(`http://${window.location.hostname}:8080/signin`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': response.headers.get('x-csrf-token')!,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(text),
            });
            if (res.ok) {
                eventEmitter.goToMainPage(1);
                return;
            }
            const body = await res.json();
            eventEmitter.emit('error', checkStatus(body['status'], text.Username));
        } catch (e) {
            console.log(e);
        }
    }
}