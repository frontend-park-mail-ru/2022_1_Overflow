import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LenghtCheck} from "../LenghtCheck/LenghtCheck";
import {checkStatus} from "../CheckInput/CheckInput";


export class SignInModel {
    private text: {Username: string, password: string};

    constructor() {
        this.text = {Username: '', password: ''};
    }

    checkInput = async (text: {Username: string, password: string}) => {
        const errLogin = LenghtCheck(text.Username, 'логина');
        if (errLogin !== '') {
            eventEmitter.emit('error', errLogin);
            return;
        }
        const errPassword = LenghtCheck(text.password, 'пароля');
        if (errPassword !== '') {
            eventEmitter.emit('error', errPassword);
            return;
        }
        await this.fetchSignIn(text);
    }

    fetchSignIn = async (text: {Username: string, password: string}) => {
        try {
            const res = await fetch(`http://${window.location.hostname}:8080/signin`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(text),
            })
            if (res.ok) {
                eventEmitter.goToMainPage();
                return;
            }
            const body = await res.json();
            eventEmitter.emit('error', checkStatus(body['status'], text.Username));
        } catch (e) {
            console.log(e);
        }
    }
}