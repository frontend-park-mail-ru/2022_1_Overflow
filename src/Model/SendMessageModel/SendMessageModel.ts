import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {getCSRFToken} from "../Network/NetworkGet";
import {router} from "../../Presenter/Router/Router";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";


export class SendMessageModel {
    private text: { addressee: string, files: string, text: string, theme: string };
    private infoProfile: { lastName: string, firstName: string, login: string };

    constructor() {
        this.text = { addressee: '', files: '', text: '', theme: '' };
        this.infoProfile = { lastName: '', firstName: '', login: '' };
    }

    cleanDefault = (data: { avatar: string, login: string, theme: string, date: string, text: string }) => {
        data.text = `\n\n\nС уважением,\n${this.infoProfile.lastName} ${this.infoProfile.firstName}`;
    }

    cleanLogin = (data: { avatar: string, login: string, theme: string, date: string, text: string }) => {
        data.text = `Переслано от ${data.login}:\n${data.text}`;
        data.login = '';
    }

    cleanRe = (data: { avatar: string, login: string, theme: string, date: string, text: string }) => {
        if (data === null) {
            return;
        }
        let i: number;
        const r = /Re\(\d+\)/g;
        const r_dec = /\d+/g;
        if (data.theme.match(r) === null) {
            i = 1;
            data.theme = `Re(${i}): ${data.theme}`;
        } else {
            i = Number(data.theme.match(r)![0].match(r_dec)![0]) + 1;
            data.theme = data.theme.replace(r, `Re(${i})`);
        }

        const splitText: string[] = data.text.split('\n');
        splitText.forEach((text, idx) => {
            splitText[idx] = '>>' + text;
        });

        data.text = `\n\n\nС уважением,\n${this.infoProfile.lastName} ${this.infoProfile.firstName}\n\n>>В ответ ${data.login} на:\n${splitText.reduce((text, cur, idx) => {
            if (idx === splitText.length - 1) {
                return text + `${cur}`;
            }
            return text + `${cur}\n`;
        }, '')}`
    }

    checkInput = async (text: { addressee: string, files: string, text: string, theme: string }) => {
        if (text.addressee === '') {
            eventEmitter.emit('error', 'Укажите кому вы хотите отправить сообщение');
            return;
        }
        if (text.text === '') {
            eventEmitter.emit('error', 'Сообщение не может быть пустым');
            return;
        }
        if (text.theme === '') {
            eventEmitter.emit('errorTheme', {text: 'Хотите отправить сообщение без темы?', handler: this.fetchSend});
            return;
        }
        await this.fetchSend(text);
    }

    fetchSend = async (text: { addressee: string, files: string, text: string, theme: string }) => {
        try {
            const header = await getCSRFToken(`http://${window.location.hostname}:8080/mail/send`);
            const res = await fetch(`http://${window.location.hostname}:8080/mail/send`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(text),
            });
            if (res.ok) {
                router.redirect(urlsRouter.income);
                return;
            }

            if (!res.ok) {
                const body = await res.json();
                if (body['status'] === 11) {
                    eventEmitter.emit('error', 'Вы пытаетесь отправить сообщение несуществующему пользователю');
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    fetchDraft = async (data: { folder_name: string, form: {
        addressee: string,
        files: string,
        text: string,
        theme: string}}) => {
        try {
            const header = await getCSRFToken(`http://${window.location.hostname}:8080/folder/mail/add_form`);
            const res = await fetch(`http://${window.location.hostname}:8080/folder/mail/add_form`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(data),
            });
        } catch (e) {
            console.error(e);
        }
    }

    fetchGetProfile = async () => {
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
                this.infoProfile.login = json['username'];
                this.infoProfile.lastName = json['last_name'];
                this.infoProfile.firstName = json['first_name'];
            }
        } catch (e) {
            console.error(e);
        }
    }

    fetchGetUserAvatar = async (name: string) => {
        try {
            const res = await fetch(`http://${window.location.hostname}:8080/profile/avatar?username=${name}`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (res.ok) {
                const body = await res.json();
                eventEmitter.emit('setAvatar', body['message']);
                return;
            }
        } catch (e) {
            console.error(e);
        }
    }
}