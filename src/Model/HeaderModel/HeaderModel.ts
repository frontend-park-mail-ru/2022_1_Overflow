import {getCSRFToken} from "../Network/NetworkGet";
import {router} from "../../Presenter/Router/Router";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";
import {http} from "../../index";
import {socket} from "../../Presenter/WebSocketMessage/WebSocketMessage";


export class HeaderModel {
    private name: string;
    private avatar: string;

    constructor() {
        this.name = ''
        this.avatar = '';
    }

    outputData = () => {
        return {name: this.name, avatar: this.avatar}
    }

    getProfile = async () => {
        try {
            const res = await fetch(`${http}://${window.location.hostname}/api/v1/profile`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (res.ok) {
                const json = await res.json();
                this.name = json['username'];
            }

            if (!res.ok) {
                const json = await res.json();
                return json['status'];
            }
        } catch (e) {
            console.error(e);
        }
    }

    getAvatar = async() => {
        try {
            const res = await fetch(`${http}://${window.location.hostname}/api/v1/profile/avatar`, {
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
            console.error(e);
        }
    }

    logout = async () => {
        const header = await getCSRFToken(`${http}://${window.location.hostname}/api/v1/logout`);

        await fetch(`${http}://${window.location.hostname}/api/v1/logout`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-token': header,
            },
            credentials: 'include'
        });
        socket.close();
        router.redirect(urlsRouter.login);
    }

}