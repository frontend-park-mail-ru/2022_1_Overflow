import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LengthCheckPasswordAndName} from "../LengthCheck/LengthCheck";
import {getCSRFToken} from "../Network/NetworkGet";
import {router} from "../../Presenter/Router/Router";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";


export class SecurityModel {
    private readonly data: { Username: string, FirstName: string, LastName: string, avatar: string, password: string };

    constructor() {
        this.data = {Username: '', FirstName: '', LastName: '', avatar: '', password: ''};
    }

    checkInput = async (data: {last_password: string, password: string, password_repeat: string}) => {
        const errLastPassword = LengthCheckPasswordAndName(data.last_password, 'старого пароль');
        if (errLastPassword !== '') {
            eventEmitter.emit('error', {text: errLastPassword, type: 'LastPassword'});
        }
        const errPassword = LengthCheckPasswordAndName(data.password, 'пароля');
        if (errPassword !== '') {
            eventEmitter.emit('error', {text: errPassword, type: 'Password'});
        }
        const errPasswordRepeat = LengthCheckPasswordAndName(data.password_repeat, 'пароля');
        if (errPasswordRepeat !== '') {
            eventEmitter.emit('error', {text: errPassword, type: 'PasswordRepeat'});
        }
        if (data.password !== data.password_repeat) {
            eventEmitter.emit('error', {text: '', type: 'Password'});
            eventEmitter.emit('error', {text: 'Поля пароля и повтора пароля не совпадают', type: 'PasswordRepeat'});
            return;
        }
        if (errLastPassword === '' && errPassword === '' && errPasswordRepeat === '') {
            await this.fetchSetPassword({password_old: data.last_password, password_new: data.password, password_new_confirmation: data.password_repeat});
        }
    }

    fetchProfile = async () => {
        try {
            const res = await fetch(`http://${window.location.hostname}:8080/profile`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (res.ok) {
                const json = await res.json();
                this.data.Username = json['username'];
                this.data.LastName = json['last_name'];
                this.data.FirstName = json['first_name'];
            }
        } catch (e) {
            console.error(e);
        }
    }

    fetchSetPassword = async (data: {password_old: string, password_new: string, password_new_confirmation: string}) => {
        try {
            const header = await getCSRFToken(`http://${window.location.hostname}:8080/profile/change_password`);
            const postSetProfile = await fetch(`http://${window.location.hostname}:8080/profile/change_password`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (postSetProfile.ok) {
                router.redirect(urlsRouter.income);
                return;
            }
            const json: {message: string, status: number} = await postSetProfile.json();
            if (json.status === 2) {
                eventEmitter.emit('error', {text: '', type: 'LastPassword'});
                eventEmitter.emit('error', {text: '', type: 'Password'});
                eventEmitter.emit('error', {text: 'Старый и новый пароли не должны совпадать', type: 'PasswordRepeat'});
                return;
            }
            if (json.status === 13) {
                eventEmitter.emit('error', {text: 'Старый пароль не верный', type: 'LastPassword'});
                return;
            }
            eventEmitter.emit('error', {text: json.message, type: 'LastPassword'});
        } catch (e) {
            console.error(e);
        }
    }
}