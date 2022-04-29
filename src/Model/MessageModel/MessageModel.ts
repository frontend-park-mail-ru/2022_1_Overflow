export class MessageModel {
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
            avatar: string,
            timeReal: string,
        }[];

    private json: any;

    outputData() {
        const monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
            "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
        ];
        this.messages = [];
        if (this.json === null) {
            return null;
        }
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
                dateSet = ('0' + date.getUTCHours()).slice(-2) + ':' + ('0' + (date.getUTCMinutes())).slice(-2);
            } else {
                dateSet = ('0' + date.getDate()).slice(-2) + ' ' + (monthNames[date.getMonth()]);
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
                timeReal: pars['mail']['date'],
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