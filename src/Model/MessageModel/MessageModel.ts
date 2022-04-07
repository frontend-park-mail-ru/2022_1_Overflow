import {Ajax} from "../Network/Ajax";
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";


export class MessageModel {
    private message: any;

    constructor() {
        this.message = ''
    }

    outputData() {
        return this.message;
    }

    async getMessage() {
        await fetch(`http://${window.location.hostname}:8080/mail/income`, {
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
            this.message = body;
        }).catch(() => {
            eventEmitter.goToSignIn();
        });
    }
}