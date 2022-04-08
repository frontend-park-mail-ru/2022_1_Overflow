import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";


export class SendMessageModel {
    private text: { addressee: string, files: string, text: string, theme: string};

    constructor() {
        this.text = { addressee: '', files: '', text: '', theme: ''};
    }

    checkInput = async (text: { addressee: string, files: string, text: string, theme: string}) => {
        await this.fetchSend(text);
    }

    fetchSend = async (text: { addressee: string, files: string, text: string, theme: string}) => {
        try {
            const res = await fetch(`http://${window.location.hostname}:8080/mail/send`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(text),
            });
            if (res.ok) {
                eventEmitter.goToMainPage();
                return;
            }
            const body = await res.json();
            console.log(body);
        } catch (e) {
            console.log(e);
        }
    }
}