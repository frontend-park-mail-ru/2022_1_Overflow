import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {LenghtCheck} from "../LenghtCheck/LenghtCheck";
import {checkStatus} from "../CheckInput/CheckInput";


export class ProfileModel {
    private data: { Username: string, FirstName: string, LastName: string, avatar: any, password: string };

    constructor() {
        this.data = {Username: '', FirstName: '', LastName: '', avatar: '', password: ''};
    }

    outPutData() {
        return this.data;
    }

    checkInput = async (data: { first_name: string, last_name: string, avatar: any }) => {
        console.log(data)
        const errFirstName = LenghtCheck(data.first_name, 'Имени');
        if (errFirstName !== '') {
            eventEmitter.emit('error', errFirstName);
            return;
        }
        const errLastName = LenghtCheck(data.last_name, 'Фамилии');
        if (errLastName !== '') {
            eventEmitter.emit('error', errLastName);
            return;
        }
        await this.fetchSetAvatar(data);
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
                this.data.Username = json['Username'];
                this.data.LastName = json['LastName'];
                this.data.FirstName = json['FirstName'];
                this.data.password = json['password'];
            }
        } catch (e) {
            console.log(e);
            eventEmitter.goToSignIn();
        }
    }

    fetchGetAvatar = async () => {
        try {
            const getAvatar = await fetch(`http://${window.location.hostname}:8080/profile/avatar`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (getAvatar.ok) {
                const json = await getAvatar.json();
                this.data.avatar = json['message'];
            }
        } catch (e) {
            console.log(e);
        }
    }

    fetchSetAvatar = async (data: { first_name: string, last_name: string, avatar: any }) => {
        try {
            if (data.avatar !== undefined) {
                const formData = new FormData();
                formData.append('file', data.avatar);

                const getAvatar = await fetch(`http://${window.location.hostname}:8080/profile/avatar/set`, {
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (getAvatar.status !== 405) {
                    return;
                }

                const postAvatarSet = await fetch(`http://${window.location.hostname}:8080/profile/avatar/set`, {
                    mode: 'cors',
                    headers: {
                        'X-CSRF-token': getAvatar.headers.get('x-csrf-token')!,
                    },
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                });

                if (!postAvatarSet.ok) {
                    return;
                }
            }

            const getSetProfile = await fetch(`http://${window.location.hostname}:8080/profile/set`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (getSetProfile.status !== 405) {
                return;
            }

            const postSetProfile = await fetch(`http://${window.location.hostname}:8080/profile/set`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': getSetProfile.headers.get('x-csrf-token')!,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (postSetProfile.ok) {
                eventEmitter.goToMainPage(1);
            }
        } catch (e) {
            console.log(e);
        }
    }
}