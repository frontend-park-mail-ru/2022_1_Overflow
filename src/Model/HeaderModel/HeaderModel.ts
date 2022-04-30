import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import { frontUrls } from "../../Services/router/fronturls";
import { router } from "../../Services/router/router";


export class HeaderModel {
    private name: string;
    private avatar: string;

    constructor() {
        this.name = ''
        this.avatar = '';
    }

    outputData() {
        return {name: this.name, avatar: this.avatar}
    }

    async getProfile() {
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
                this.name = json['Username'];
                return;
            }
            router.redirect(frontUrls.login);
        } catch (e) {
            console.log(e);
            router.redirect(frontUrls.login);
        }
    }

    async getAvatar() {
        try {
            const res = await fetch(`http://${window.location.hostname}:8080/profile/avatar`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (res.ok) {
                const json = await res.json();
                this.avatar = json['message'];
            }
        } catch (e) {
            console.log(e);
            router.redirect(frontUrls.login);
        }
    }

    async logout() {
        const response = await fetch(`http://${window.location.hostname}:8080/logout`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        await fetch(`http://${window.location.hostname}:8080/logout`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-token': response.headers.get('x-csrf-token')!,
            },
            credentials: 'include'
        });
        router.redirect(frontUrls.login);
    }

}