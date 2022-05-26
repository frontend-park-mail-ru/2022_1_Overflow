import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LengthCheckPasswordAndName, LengthCheckUsername} from "../LengthCheck/LengthCheck";
import {checkStatus} from "../CheckStatus/CheckStatus";
import {getCSRFToken} from "../Network/NetworkGet";
import {router} from "../../Presenter/Router/Router";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";
import {http} from "../../index";
import {socket} from "../../Presenter/WebSocketMessage/WebSocketMessage";


export class SignUpModel {
    private text: {firstName: string, lastName: string, username: string, password: string, passwordConfirmation: string};

    constructor() {
        this.text = {firstName: '', lastName: '', username: '', password: '', passwordConfirmation: ''};
    }

    checkInput = async(text: {firstName: string, lastName: string, username: string, password: string, passwordConfirmation: string}) => {
        const errFirstName = LengthCheckPasswordAndName(text.firstName, 'имени');
        if (errFirstName !== '') {
            eventEmitter.emit('error', {text: errFirstName, type: 'FirstName'});
        }

        const errLastName = LengthCheckPasswordAndName(text.lastName, 'фамилии');
        if (errLastName !== '') {
            eventEmitter.emit('error', {text: errLastName, type: 'LastName'});
        }

        const errUsername = LengthCheckUsername(text.username, 'логина');
        if (errUsername !== '') {
            eventEmitter.emit('error', {text: errUsername, type: 'Login'});
        }

        const errPassword = LengthCheckPasswordAndName(text.password, 'пароля');
        if (errPassword !== '') {
            eventEmitter.emit('error', {text: errPassword, type: 'Password'});
        }

        const errPasswordConfirmation = LengthCheckPasswordAndName(text.passwordConfirmation, 'повтора пароля');
        if (errPasswordConfirmation !== '') {
            eventEmitter.emit('error', {text: errPasswordConfirmation, type: 'PasswordRepeat'});
        }

        if (text.password !== text.passwordConfirmation) {
            eventEmitter.emit('error', {text: '', type: 'Password'});
            eventEmitter.emit('error', {text: 'Поля пароля и повтора пароля не совпадают', type: 'PasswordRepeat'});
            return;
        }

        if (errFirstName === '' && errLastName === '' && errUsername === '' &&
            errPassword === '' && errPasswordConfirmation === '') {
            await this.fetchSignUp(text);
        }
    }

    fetchSignUp = async (text: {firstName: string, lastName: string, username: string, password: string, passwordConfirmation: string}) => {
        try {
            const header = await getCSRFToken(`${http}://${window.location.hostname}/api/v1/signup`);
            const res = await fetch(`${http}://${window.location.hostname}/api/v1/signup`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    'first_name': text.firstName,
                    'last_name': text.lastName,
                    'username': text.username,
                    'password': text.password,
                    'password_confirmation': text.passwordConfirmation,
                }),
            });
            if (res.ok) {
                await this.fetchSignIn({username: text.username, password: text.password});
                return;
            }
            const json = await res.json();
            eventEmitter.emit('error', { text: checkStatus(json['status'], text.username), type: 'Login'});
        } catch (e) {
            console.error(e);
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
            })
            if (res.ok) {
                socket.init();
                router.redirect(urlsRouter.income);
                return;
            }
            const body = await res.json();
            eventEmitter.emit('error', checkStatus(body['status'], text.username));
        } catch (e) {
            console.error(e);
        }
    }
}