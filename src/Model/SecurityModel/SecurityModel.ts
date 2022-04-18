import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LenghtCheck} from "../LenghtCheck/LenghtCheck";
import {checkStatus} from "../CheckInput/CheckInput";


export class SecurityModel {
    private data: { Username: string, FirstName: string, LastName: string, avatar: any, password: string };

    constructor() {
        this.data = {Username: '', FirstName: '', LastName: '', avatar: '', password: ''};
    }

    outPutData() {
        return this.data;
    }

    checkInput = async (data: {last_password: string, password: string, password_repeat: string}) => {
        console.log(data)
        const errLastPassword = LenghtCheck(data.last_password, 'старого пароль');
        if (errLastPassword !== '') {
            eventEmitter.emit('error', errLastPassword);
            return;
        }
        console.log(data.last_password, this.data.password)
        if (data.last_password !== this.data.password) {
            eventEmitter.emit('error', 'Старый пароль не верный');
            return;
        }
        const errPassword = LenghtCheck(data.password, 'пароля');
        if (errPassword !== '') {
            eventEmitter.emit('error', errPassword);
            return;
        }
        const errPasswordRepeat = LenghtCheck(data.password_repeat, 'пароля');
        if (errPasswordRepeat !== '') {
            eventEmitter.emit('error', errPasswordRepeat);
            return;
        }
        if (data.password !== data.password_repeat) {
            eventEmitter.emit('error', 'Поля пароля и повтора пароля не совпадают');
            return;
        }
        await this.fetchSetPassword({password: data.password});
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
            console.log(e);
            eventEmitter.goToSignIn();
        }
    }

    fetchSetPassword = async (data: {password: string}) => {
        try {
            const getSetProfile = await fetch(`http://${window.location.hostname}:8080/profile/set`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (getSetProfile.status !== 405) {
                return;
            }

            const postSetProfile = await fetch(`http://${window.location.hostname}:8080/profile/set`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': getSetProfile.headers.get('x-csrf-token')!,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (postSetProfile.ok) {
                eventEmitter.goToMainPage(1);
            }
        } catch (e) {
            console.log(e);
        }
    }
}