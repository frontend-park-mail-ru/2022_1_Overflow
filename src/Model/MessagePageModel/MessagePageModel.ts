import {getCSRFToken} from "../Network/NetworkGet";

export class MessagePageModel {
    private readonly id: number;
    private body: {id: number, message: string};

    constructor(id: number) {
        this.id = id;
    }

    setTime = (time: string) => {
        const today = new Date();
        const date = new Date(time);
        if (date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()) {
            return `Сегодня в ${('0' + date.getUTCHours()).slice(-2) + ':' + ('0' + (date.getUTCMinutes() + 1)).slice(-2)}`;
        } else {
            return `${('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2)} в ${('0' + date.getUTCHours()).slice(-2) + ':' + ('0' + (date.getUTCMinutes() + 1)).slice(-2)}`;
        }
    }

    getMessage = async () => {
        const header = await getCSRFToken(`http://${window.location.hostname}:8080/mail/read`);

        try {
            const res = await fetch(`http://${window.location.hostname}:8080/mail/read`, {
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
                this.body = await res.json();
                return;
            }
        } catch (e) {
            console.error(e);
        }
    }
}
