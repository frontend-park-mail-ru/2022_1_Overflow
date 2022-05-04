import {getCSRFToken} from "../Network/NetworkGet";
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";

export class MessageModel {
    private messages:
        {
            id: number,
            client_id: number,
            sender: string,
            title: string,
            subTitle: string,
            files: string,
            time: string,
            read: boolean,
            avatar: string,
            timeReal: string,
        }[];

    private json: [{mail: {
            id: number,
            client_id: number,
            sender: string,
            addressee: string,
            theme: string,
            text: string,
            file: string,
            date: string,
            read: boolean,
        }
        avatar_url: string
    }];

    outputData = () => {
        const monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
            "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
        ];
        this.messages = [];
        if (this.json === null) {
            return null;
        }

        this.json.forEach((pars) => {
            const date = new Date(pars.mail.date);
            let dateSet: string;
            const today = new Date();
            if (date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()) {
                dateSet = ('0' + date.getUTCHours()).slice(-2) + ':' + ('0' + (date.getUTCMinutes())).slice(-2);
            } else {
                dateSet = ('0' + date.getDate()).slice(-2) + ' ' + (monthNames[date.getMonth()]);
            }
            this.messages.push({
                id: pars.mail.id,
                client_id: pars.mail.client_id,
                avatar: `http://${window.location.hostname}:8080/${pars.avatar_url}`,
                read: pars.mail.read,
                sender: (pars.mail.sender !== '') ? pars.mail.sender : pars.mail.addressee,
                title: pars.mail.theme,
                files: pars.mail.file,
                subTitle: pars.mail.text,
                time: dateSet,
                timeReal: pars.mail.date,
            });
        });
        return this.messages;
    }

    getOutComeMessage = async () => {
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
            console.error(e);
        }
    }

    rmMessage = async (id: string) => {
        const header = await getCSRFToken(`http://${window.location.hostname}:8080/mail/delete`);

        await fetch(`http://${window.location.hostname}:8080/mail/delete?id=${id}`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-token': header,
            },
            method: 'POST',
            credentials: 'include',
        });
    }

    getFolders = async () => {
        try {
            const res = await fetch(`http://${window.location.hostname}:8080/folder/list`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (res.ok) {
                const json = await res.json();
            }
        } catch (e) {
            console.error(e);
        }
    }

    getMessage = async () => {
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
            console.error(e);
        }
    }
}