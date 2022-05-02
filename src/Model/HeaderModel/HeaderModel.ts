import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {getCSRFToken} from "../Network/NetworkGet";


export class HeaderModel {
    private name: string;
    private avatar: string;

    constructor() {
        this.name = ''
        this.avatar = '';
    }

    outputData = () => {
        return {name: this.name, avatar: this.avatar}
    }

    getProfile = async () => {
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
                this.name = json['Username'];
            }

            if (!res.ok) {
                eventEmitter.goToSignIn();
            }
        } catch (e) {
            console.log(e);
        }
    }

    getAvatar = async() => {
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
                this.avatar = json['message'];
            }
        } catch (e) {
            console.error(e);
            eventEmitter.goToSignIn();
        }
    }

    logout = async () => {
        const header = await getCSRFToken(`http://${window.location.hostname}:8080/logout`);

        await fetch(`http://${window.location.hostname}:8080/logout`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-token': header,
            },
            credentials: 'include'
        });
        eventEmitter.goToSignIn();
    }

}