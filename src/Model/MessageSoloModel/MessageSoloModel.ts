export class MessageSoloModel {
    private messageInfo: any;
    private id: number;
    private body: any;

    constructor(id: number) {
        this.id = id;
        this.messageInfo = '';
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
