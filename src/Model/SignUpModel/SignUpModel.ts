import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LenghtCheck} from "../LenghtCheck/LenghtCheck";
import {checkStatus} from "../CheckInput/CheckInput";
import {SignInModel} from "../SignInModel/SignInModel";


export class SignUpModel {
    private text: {firstName: string, lastName: string, Username: string, password: string, passwordConfirmation: string};

    constructor() {
        this.text = {firstName: '', lastName: '', Username: '', password: '', passwordConfirmation: ''};
    }

    checkInput = async(text: {firstName: string, lastName: string, Username: string, password: string, passwordConfirmation: string}) => {
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

        await this.fetchSignUp(text);
    }

    fetchSignUp = async (text: {firstName: string, lastName: string, Username: string, password: string, passwordConfirmation: string}) => {
        const response = await fetch(`http://${window.location.hostname}:8080/signin`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        try {
            const res = await fetch(`http://${window.location.hostname}:8080/signup`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': response.headers.get('x-csrf-token')!,
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
            });
            if (res.ok) {
                await this.fetchSignIn({Username: text.Username, password: text.password});
                return;
            }
            const json = await res.json();
            eventEmitter.emit('error', checkStatus(json['status'], text.Username));
        } catch (e) {
            console.log(e);
        }
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