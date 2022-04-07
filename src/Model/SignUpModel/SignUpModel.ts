import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LenghtCheck} from "../LenghtCheck/LenghtCheck";
import {checkStatus} from "../CheckInput/CheckInput";


export class SignUpModel {
    private text: {firstName: string, lastName: string, Username: string, password: string, passwordConfirmation: string};

    constructor() {
        this.text = {firstName: '', lastName: '', Username: '', password: '', passwordConfirmation: ''};
    }

    checkInput(text: {firstName: string, lastName: string, Username: string, password: string, passwordConfirmation: string}) {
        const errFirstName = LenghtCheck(text.firstName, 'имени');
        if (errFirstName !== '') {
            eventEmitter.emit('error', errFirstName);
            return;
        }

        const errLastName = LenghtCheck(text.lastName, 'фамилии');
        if (errLastName !== '') {
            eventEmitter.emit('error', errLastName);
            return;
        }

        const errUsername = LenghtCheck(text.Username, 'логина');
        if (errUsername !== '') {
            eventEmitter.emit('error', errUsername);
            return;
        }

        const errPassword = LenghtCheck(text.password, 'пароля');
        if (errPassword !== '') {
            eventEmitter.emit('error', errPassword);
            return;
        }

        const errPasswordConfirmation = LenghtCheck(text.passwordConfirmation, 'повтора пароля');
        console.log(errPasswordConfirmation);
        if (errPasswordConfirmation !== '') {
            eventEmitter.emit('error', errPasswordConfirmation);
            return;
        }

        if (text.password !== text.passwordConfirmation) {
            eventEmitter.emit('error', 'Поля пароля и повтора пароля не совпадают');
            return;
        }


        fetch(`http://${window.location.hostname}:8080/signup`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                'first_name': text.firstName,
                'last_name': text.lastName,
                'username': text.Username,
                'password': text.password,
                'password_confirmation': text.passwordConfirmation,
            }),
        }).then((res) => {
            if (res.ok) {
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
            return res.json();
        }).then((body) => {
            eventEmitter.emit('error', checkStatus(body['status'], text.Username));
        }).catch((body) => {
            eventEmitter.emit('error', checkStatus(body['status'], text.Username));
        });
    }
}