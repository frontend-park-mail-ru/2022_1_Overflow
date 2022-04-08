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
        try {
            const res = await fetch(`http://${window.location.hostname}:8080/mail/income`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (res.ok) {
                this.message = await res.json();
            }
        } catch (e) {
            console.log(e);
            eventEmitter.goToSignIn();
        }
    }
}