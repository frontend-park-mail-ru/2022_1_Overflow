import {getCSRFToken} from '../Network/NetworkGet';
import {router} from "../../Presenter/Router/Router";
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";

export class MessagePageModel {
    private readonly id: number;
    private data: {
        avatar: string,
        addressee: string,
        date: Date,
        files: string,
        id: number,
        read: boolean,
        sender: string,
        text: string,
        theme: string,
        realDate: string,
    };
    private files: string[]

    constructor(id: number) {
        this.id = id;
        this.files = [];
    }

    outputFiles = (): string[] => {
        return this.files;
    }

    outputData = (): {avatar: string, addressee: string; date: Date; files: string; id: number; read: boolean; sender: string; text: string; theme: string; realDate: string} => {
        return this.data;
    }

    setTime = () => {
        const today = new Date();
        const date = new Date(this.data.date);
        if (date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()) {
            this.data.realDate = `Сегодня в ${('0' + date.getHours()).slice(-2) + ':' + ('0' + (date.getMinutes())).slice(-2)}`;
        } else {
            this.data.realDate = `${('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2)} в ${('0' + date.getHours()).slice(-2) + ':' + ('0' + (date.getMinutes())).slice(-2)}`;
        }
    }

    getFiles = async () => {
        try {
            const header = await getCSRFToken(`http://${window.location.hostname}:80/api/v1/mail/attach/list`);
            const res = await fetch(`http://${window.location.hostname}:80/api/v1/mail/attach/list`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({mail_id: this.id})
            })
            if (res.ok) {
                const json: {filenames: string[]} = await res.json();
                this.files = json.filenames
            }
        } catch (e) {
            console.error(e);
        }
    }

    getMessage = async () => {
        try {
            const res = await fetch(`http://${window.location.hostname}:80/api/v1/mail/get?id=${this.id}`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            if (res.ok) {
                this.data = await res.json();
            }
        } catch (e) {
            console.error(e);
        }
    }

    getAvatar = async(type: string) => {
        let name;
        if (type === 'output'){
            name = this.data.addressee;
        } else {
            name = this.data.sender;
        }
        try {
            const res = await fetch(`http://${window.location.hostname}:80/api/v1/profile/avatar?username=${name}`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (res.ok) {
                const json: {status: number, message: string} = await res.json();
                this.data.avatar = `http://${window.location.hostname}:80/api/v1/${json.message}`;
            }
        } catch (e) {
            console.error(e);
        }
    }

    readMessage = async () => {
        try {
            const header = await getCSRFToken(`http://${window.location.hostname}:80/api/v1/mail/read`);
            const res = await fetch(`http://${window.location.hostname}:80/api/v1/mail/read`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({id: this.id, isread: true})
            })
            if (res.ok) {
                return;
            }
        } catch (e) {
            console.error(e);
        }
    }
}
