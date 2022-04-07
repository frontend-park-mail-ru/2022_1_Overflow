import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LenghtCheck} from "../LenghtCheck/LenghtCheck";
import {checkStatus} from "../CheckInput/CheckInput";


export class SignInModel {
    private text: {Username: string, password: string};

    constructor() {
        this.text = {Username: '', password: ''};
    }

    checkInput(text: {Username: string, password: string}) {
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

        fetch(`http://${window.location.hostname}:8080/signin`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(text),
        }).then((res) => {
            console.log(res);
            if (res.ok) {
                eventEmitter.goToMainPage();
            }
            return res.json();
        }).then((body) => {
            eventEmitter.emit('error', checkStatus(body['status'], text.Username));
        }).catch((body) => {
            eventEmitter.emit('error', checkStatus(body['status'], text.Username));
        });
    }
}