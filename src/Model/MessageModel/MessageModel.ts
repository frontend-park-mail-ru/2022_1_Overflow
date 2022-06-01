import {getCSRFToken} from "../Network/NetworkGet";
import {http} from "../../index";

export class MessageModel {
    private messages:
        {
            id: number,
            client_id: number,
            sender: string,
            addressee: string,
            title: string,
            subTitle: string,
            files: string,
            time: string,
            read: boolean,
            avatar: string,
            timeReal: string,
        }[];

    private json: {amount: number, mails: [{
            mail: {
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
        }]
    };

    outputData = () => {
        const monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
            "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
        ];
        this.messages = [];
        if (this.json.mails === null) {
            return null;
        }

        this.json.mails.forEach((pars) => {
            const date = new Date(pars.mail.date);
            let dateSet: string;
            const today = new Date();
            if (date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()) {
                dateSet = ('0' + date.getHours()).slice(-2) + ':' + ('0' + (date.getMinutes())).slice(-2);
            } else {
                dateSet = ('0' + date.getDate()).slice(-2) + ' ' + (monthNames[date.getMonth()]);
            }
            this.messages.push({
                id: pars.mail.id,
                client_id: pars.mail.client_id,
                avatar: `${http}://${window.location.hostname}${pars.avatar_url}`,
                read: pars.mail.read,
                addressee: pars.mail.addressee,
                sender: pars.mail.sender,
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
            const res = await fetch(`${http}://${window.location.hostname}/api/v1/mail/outcome`, {
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

    rmMessageInFolder = async (folder_name: string, mail_id: number) => {
        const header = await getCSRFToken();

        await fetch(`${http}://${window.location.hostname}/api/v1/folder/mail/delete`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-token': header,
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({folder_name, mail_id}),
        });
    }

    rmMessage = async (id: number) => {
        const header = await getCSRFToken();

        await fetch(`${http}://${window.location.hostname}/api/v1/mail/delete`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-token': header,
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({id}),
        });
    }

    selectFolderMessage = async (folder_name: string) => {
        try {
            const res = await fetch(`${http}://${window.location.hostname}/api/v1/folder/list?folder_name=${folder_name}`, {
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

    moveInFolderMessage = async (folder_name_dest: string, folder_name_src: string, mail_id: number) => {
        try {
            const header = await getCSRFToken();
            await fetch(`${http}://${window.location.hostname}/api/v1/folder/mail/move`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({folder_name_dest, folder_name_src, mail_id}),
            });
        } catch (e) {
            console.error(e);
        }
    }

    addInFolderMessage = async (folder_name: string, mail_id: number) => {
        try {
            const header = await getCSRFToken();
            await fetch(`${http}://${window.location.hostname}/api/v1/folder/mail/add`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({folder_name: folder_name, mail_id: mail_id, move: true}),
            });
        } catch (e) {
            console.error(e);
        }
    }

    getFolders = async () => {
        try {
            const res = await fetch(`${http}://${window.location.hostname}/api/v1/folder/list`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (res.ok) {
                const json: {amount: number , folders:[{id: number, name: string, user_id: number, created_at: string}]} = await res.json();
                if (!json.folders) {
                    return null;
                }
                const folders: {id: number, name: string, userId: number, date: string}[] = [];
                json.folders.forEach((item) => {
                    console.log({id: item.id, name: item.name, userId: item.user_id, date: item.created_at});
                    folders.push({id: item.id, name: item.name, userId: item.user_id, date: item.created_at});
                });
                return folders;
            }
        } catch (e) {
            console.error(e);
        }
    }

    getMessage = async (name: string) => {
        if (name === 'income' || name === 'outcome') {
            try {
                const res = await fetch(`${http}://${window.location.hostname}/api/v1/mail/${name}`, {
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
        } else {
            console.log(name);
            try {
                const res = await fetch(`${http}://${window.location.hostname}/api/v1/folder/list?folder_name=${name}`, {
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
}