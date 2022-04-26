import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";


export class SendMessageModel {
    private text: { addressee: string, files: string, text: string, theme: string };
    private infoProfile: { lastName: string, firstName: string, login: string };

    constructor() {
        this.text = { addressee: '', files: '', text: '', theme: '' };
        this.infoProfile = { lastName: '', firstName: '', login: '' };
    }

    cleanDefault = (data: { avatar: any, login: string, theme: string, date: any, text: string }) => {
        console.log(this.infoProfile.lastName, this.infoProfile.firstName);
        data.text = `\n\n\nС уважением ${this.infoProfile.lastName} ${this.infoProfile.firstName}`;
    }

    cleanLogin = (data: { avatar: any, login: string, theme: string, date: any, text: string }) => {
        data.text = `Переслано от ${data.login}:\n${data.text}`;
        data.login = '';
    }

    cleanRe = (data: { avatar: any, login: string, theme: string, date: any, text: string }) => {
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
            data.theme = data.theme.replace(r, `Re(${i})`);
        }

        splitText = data.text.split('\n');
        splitText.forEach((text, idx) => {
            splitText[idx] = '>>' + text;
        });

        data.text = `\n\n\nС уважением ${this.infoProfile.lastName} ${this.infoProfile.firstName}\n\n>>В ответ ${data.login} на:\n${splitText.reduce((text, cur, idx) => {
            if (idx === splitText.length - 1) {
                return text + `${cur}`;
            }
            return text + `${cur}\n`;
        }, '')}`
    }

    checkInput = async (text: { addressee: string, files: string, text: string, theme: string }) => {
        await this.fetchSend(text);
    }

    fetchSend = async (text: { addressee: string, files: string, text: string, theme: string }) => {
        try {
            const response = await fetch(`http://${window.location.hostname}:8080/mail/send`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

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
                eventEmitter.goToMainPage(1);
                return;
            }

            if (!res.ok) {
                const body = await res.json();
                if (body['status'] === 11) {
                    eventEmitter.emit('error', null);
                }
            }
        } catch (e) {
            console.log(e);
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
                this.infoProfile.login = json['Username'];
                this.infoProfile.lastName = json['LastName'];
                this.infoProfile.firstName = json['FirstName'];
            }

            if (!res.ok) {
                eventEmitter.goToSignIn();
            }
        } catch (e) {
            console.log(e);
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
            console.log(e);
        }
    }
}