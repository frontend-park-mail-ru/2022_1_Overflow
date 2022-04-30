import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LenghtCheck} from "../LenghtCheck/LenghtCheck";
import {checkStatus} from "../CheckInput/CheckInput";
import { router } from "../../Services/router/router";
import { frontUrls } from "../../Services/router/fronturls";


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
            })
            if (res.ok) {
                router.redirect(frontUrls.main)
                return;
            }
            const body = await res.json();
            eventEmitter.emit('error', checkStatus(body['status'], text.Username));
        } catch (e) {
            console.log(e);
        }
    }
}