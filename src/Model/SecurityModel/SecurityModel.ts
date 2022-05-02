import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LengthCheckPasswordAndName} from "../LengthCheck/LengthCheck";
import {getCSRFToken} from "../Network/NetworkGet";


export class SecurityModel {
    private readonly data: { Username: string, FirstName: string, LastName: string, avatar: string, password: string };

    constructor() {
        this.data = {Username: '', FirstName: '', LastName: '', avatar: '', password: ''};
    }

    outPutData = () => {
        return this.data;
    }

    checkInput = async (data: {last_password: string, password: string, password_repeat: string}) => {
        const errLastPassword = LengthCheckPasswordAndName(data.last_password, 'старого пароль');
        if (errLastPassword !== '') {
            eventEmitter.emit('error', {text: errLastPassword, type: 'LastPassword'});
        }
        if (data.last_password !== this.data.password) {
            eventEmitter.emit('error', {text: 'Старый пароль не верный', type: 'LastPassword'});
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
            eventEmitter.emit('error', {text: 'Поля пароля и повтора пароля не совпадают', type: 'PasswordRepeat'});
            return;
        }
        if (errLastPassword === '' && errPassword === '' && errPasswordRepeat === '') {
            await this.fetchSetPassword({password: data.password});
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
                this.data.Username = json['Username'];
                this.data.LastName = json['LastName'];
                this.data.FirstName = json['FirstName'];
                this.data.password = json['Password'];
            }
        } catch (e) {
            console.error(e);
        }
    }

    fetchSetPassword = async (data: {password: string}) => {
        try {
            const header = await getCSRFToken(`http://${window.location.hostname}:8080/profile/set`);
            const postSetProfile = await fetch(`http://${window.location.hostname}:8080/profile/set`, {
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
                eventEmitter.goToMainPage(1);
            }
        } catch (e) {
            console.error(e);
        }
    }
}