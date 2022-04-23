import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";


export class MessageModel {
// {"id":1,"client_id":0,"sender":"123","addressee":"","theme":"123","text":"123","files":"","date":"2022-04-23T15:55:17.295892Z","read":true},"sender_avatar":"/static/1916298011_2366730844.jpeg"},{"mail":{"id":5,"client_id":0,"sender":"123456","addressee":"","theme":"123","text":"123","files":"","date":"2022-04-23T21:22:57.1378Z","read":true},"sender_avatar":"/static/dummy.png"}
    private messages:
        {
            id: number,
            client_id: number,
            sender: string,
            title: string,
            subTitle: string,
            files: string,
            time: any,
            read: boolean,
            avatar: string
        }[];

    private json: any;

    outputData() {
        this.messages = [];
        this.json = this.json.sort((a: any, b: any) => {
            return a['mail']['date'] < b['mail']['date'] ? 1 : -1;
        });
        this.json.forEach((pars: any) => {
            const date = new Date(pars['mail']['date']);
            let dateSet: string;
            const today = new Date();
            if (date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()) {
                dateSet = ('0' + date.getUTCHours()).slice(-2) + ':' + ('0' + (date.getUTCMinutes() + 1)).slice(-2);
            } else {
                dateSet = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2);
            }
            this.messages.push({
                id: pars['mail']['id'],
                client_id: pars['mail']['client_id'],
                avatar: `http://${window.location.hostname}:8080/${pars['sender_avatar']}`,
                read: pars['mail']['read'],
                sender: (pars['mail']['sender'] !== '') ? pars['mail']['sender'] : pars['mail']['addressee'],
                title: pars['mail']['theme'],
                files: pars['mail']['file'],
                subTitle: pars['mail']['text'],
                time: dateSet,
            });
        });
        return this.messages;
    }

    async getOutComeMessage() {
        try {
            const res = await fetch(`http://${window.location.hostname}:8080/mail/outcome`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (res.ok) {
                this.json = await res.json();
            }
        } catch (e) {
            console.log(e);
        }
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
                this.json = await res.json();
            }
        } catch (e) {
            console.log(e);
        }
    }
}