import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";


export class HeaderModel {
    private name: string;
    private avatar: string;

    constructor() {
        this.name = ''
        this.avatar = '';
    }

    outputData() {
        return {name: this.name, avatar: this.avatar}
    }

    async getProfile() {
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
        } catch (e) {
            console.log(e);
            eventEmitter.goToSignIn();
        }
    }

    async logout() {
        await fetch(`http://${window.location.hostname}:8080/logout`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        eventEmitter.goToSignIn();
    }

}