import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import { frontUrls } from "../../Services/router/fronturls";
import { router } from "../../Services/router/router";


export class SendMessageModel {
    private text: { addressee: string, files: string, text: string, theme: string };

    constructor() {
        this.text = {addressee: '', files: '', text: '', theme: ''};
    }

    cleanRe = (data: { avatar: any, login: string, theme: string, date: any, text: string }) => {
        data.login = '';
    }

    clean = (data: { avatar: any, login: string, theme: string, date: any, text: string }) => {
        if (data === null) {
            return;
        }
        let i: number;
        let splitText: string[];
        const r = /Re\(\d+\)/g;
        const r_dec = /\d+/g;
        if (data.theme.match(r) === null) {
            i = 1;
            data.theme = `Re(${i}): ${data.theme}`;
        } else {
            i = Number(data.theme.match(r)![0].match(r_dec)![0]) + 1;
            console.log(i);
            data.theme = data.theme.replace(r, `Re(${i})`);
        }

        splitText = data.text.split('\n');
        splitText.forEach((text, idx) => {
            splitText[idx] = '>>' + text;
        });

        data.text = `\n\n\n\n` + splitText.reduce((text, cur) => {
            return text + `${cur}\n`;
        }, '');
    }

    checkInput = async (text: { addressee: string, files: string, text: string, theme: string }) => {
        await this.fetchSend(text);
    }

    fetchSend = async (text: { addressee: string, files: string, text: string, theme: string }) => {
        const response = await fetch(`http://${window.location.hostname}:8080/mail/send`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        try {
            const res = await fetch(`http://${window.location.hostname}:8080/mail/send`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': response.headers.get('x-csrf-token')!,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(text),
            });
            if (res.ok) {
                router.redirect(frontUrls.main)
                return;
            }
            const body = await res.json();
            if (body['status'] === 11){
                alert('Пользователя не существует')
            }
        } catch (e) {
            console.log(e);
        }
    }
}