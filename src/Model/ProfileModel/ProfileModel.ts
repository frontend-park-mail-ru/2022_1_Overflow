import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LenghtCheck} from "../LenghtCheck/LenghtCheck";
import {checkStatus} from "../CheckInput/CheckInput";


export class ProfileModel {
    private data: {Username: string, FirstName: string, LastName: string, avatar: any, password: string};

    constructor() {
        this.data = {Username: '', FirstName: '', LastName: '', avatar: '', password: ''};
    }

    outPutData() {
        return this.data;
    }

    checkInput = async (data: {first_name: string, last_name: string}) => {
        const errFirstName = LenghtCheck(data.first_name, 'логина');
        if (errFirstName !== '') {
            eventEmitter.emit('error', errFirstName);
            return;
        }
        const errLastName = LenghtCheck(data.last_name, 'пароля');
        if (errLastName !== '') {
            eventEmitter.emit('error', errLastName);
            return;
        }
        await this.fetchSetProfile(data);
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
                this.data.password = json['password'];
            }
        } catch (e) {
            console.log(e);
            eventEmitter.goToSignIn();
        }
    }

    fetchSetAvatar = async () => {
        try {
            const res = await fetch(`http://${window.location.hostname}:8080/profile/avatar`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (res.ok) {
                const json = await res.json();
                this.data.avatar = json['message'];
            }
        } catch (e) {
            console.log(e);
            eventEmitter.goToSignIn();
        }
    }

    fetchSetProfile = async (data: {first_name: string, last_name: string}) => {
        console.log('fetchSetProfile');
        try {
            const res = await fetch(`http://${window.location.hostname}:8080/profile/set`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(data),
            })
            if (res.ok) {
                //eventEmitter.goToMainPage();
                return;
            }
            const body = await res.json();
            eventEmitter.emit('error', checkStatus(body['status'], this.data.Username));
        } catch (e) {
            console.log(e);
        }
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