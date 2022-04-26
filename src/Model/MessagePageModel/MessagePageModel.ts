export class MessagePageModel {
    private readonly id: number;
    private body: any;

    constructor(id: number) {
        this.id = id;
    }

    setTime(time: string) {
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

    async getMessage() {
        const response = await fetch(`http://${window.location.hostname}:8080/mail/read`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        try {
            const res = await fetch(`http://${window.location.hostname}:8080/mail/read?id=${this.id}`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': response.headers.get('x-csrf-token')!,
                },
                method: 'POST',
                credentials: 'include',
            })
            if (res.ok) {
                this.body = await res.json();
                return;
            }
        } catch (e) {
            console.log(e);
        }
    }
}
