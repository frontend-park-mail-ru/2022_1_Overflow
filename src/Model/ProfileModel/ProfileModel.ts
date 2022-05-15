import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LengthCheckPasswordAndName} from "../LengthCheck/LengthCheck";
import {getCSRFToken} from "../Network/NetworkGet";
import {router} from "../../Presenter/Router/Router";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";


export class ProfileModel {
    private data: { Username: string, FirstName: string, LastName: string, avatar: string, password: string };

    constructor() {
        this.data = {Username: '', FirstName: '', LastName: '', avatar: '', password: ''};
    }

    outPutData() {
        return this.data;
    }

    checkInput = async (data: {first_name: string, last_name: string, avatar: string}) => {
        const errFirstName = LengthCheckPasswordAndName(data.first_name, 'Имени');
        if (errFirstName !== '') {
            eventEmitter.emit('error', {text: errFirstName, type: 'FirstName'});
        }

        const errLastName = LengthCheckPasswordAndName(data.last_name, 'Фамилии');
        if (errLastName !== '') {
            eventEmitter.emit('error', {text: errLastName, type: 'LastName'});
        }

        if (errFirstName === '' && errLastName === '') {
            await this.fetchSetAvatar(data);
        }
    }

    fetchProfile = async () => {
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
                this.data.Username = json['username'];
                this.data.LastName = json['last_name'];
                this.data.FirstName = json['first_name'];
            }
            if (!res.ok) {
                const json = await res.json();
                return json['status'];
            }
        } catch (e) {
            console.error(e);
        }
    }

    fetchGetAvatar = async () => {
        try {
            const res = await fetch(`http://${window.location.hostname}:8080/profile/avatar`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (res.ok) {
                const json = await res.json();
                this.data.avatar = json['message'];
            }
        } catch (e) {
            console.error(e);
        }
    }

    fetchSetAvatar = async (data: {first_name: string, last_name: string, avatar: string}) => {
        try {
            if (data.avatar !== undefined) {
                const formData = new FormData();
                formData.append('file', data.avatar);

                const header = await getCSRFToken(`http://${window.location.hostname}:8080/profile/avatar/set`);
                const postAvatarSet = await fetch(`http://${window.location.hostname}:8080/profile/avatar/set`, {
                    mode: 'cors',
                    headers: {
                        'X-CSRF-token': header,
                    },
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                });

                if (!postAvatarSet.ok) {
                    return;
                }
            }

            const header = await getCSRFToken(`http://${window.location.hostname}:8080/profile/set`);
            const postSetProfile = await fetch(`http://${window.location.hostname}:8080/profile/set`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (postSetProfile.ok) {
                router.redirect(urlsRouter.income);
            }
        } catch (e) {
            console.error(e);
        }
    }
}