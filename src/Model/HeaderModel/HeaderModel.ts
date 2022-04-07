import {Ajax} from "../Network/Ajax";
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
        await fetch(`http://${window.location.hostname}:8080/profile`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((body) => {
            this.name = body['Username'];
        }).catch(() => {
            eventEmitter.goToSignIn();
        });
    }

    logout() {
        fetch(`http://${window.location.hostname}:8080/logout`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then(() => {
            eventEmitter.goToSignIn();
        })
    }

}