import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
const noop = (status: number, responseText: string) => {}; // eslint-disable-line

export class Ajax {
    getProfile() {
        fetch(`http://${window.location.hostname}:8080/profile`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then((res) => {
            console.log(res);
            if (res.ok) {
                return res.json()
            }
        }).then((body) => {
            console.log("fasfasfafasgsdgfhtrhtynada");
            console.log(body['Username']);
            eventEmitter.emit('setProfileName', '1231');
        })
        .catch(() => {
            eventEmitter.goToSignIn();
        });
    }

    getMessage(){
        fetch(`http://${window.location.hostname}:8080/mail/income`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).then((body) => {
            eventEmitter.emit('setProfileName', body['Username']);
        }).catch(() => {
            console.log(1);
            eventEmitter.goToSignIn();
        })
    }


    post(url: string, callback: any, data: any) {
        return this._ajax(
            url,
            'POST',
            data,
            callback,
        );
    }

    get(url: string, callback: any) {
        return this._ajax(
            url,
            'GET',
            null,
            callback,
        );
    }

    _ajax(
        url = '/',
        method = 'POST',
        data = null,
        callback = noop
    ) {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            callback(xhr.status, xhr.responseText);
        });

        if (data) {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(data));
            return;
        }
        xhr.send();
    }

    promisifyGet(url: string) {
        return new Promise((resolve, reject) => {
            this._ajax(
                url,
                'GET',
                null,
                (status, responseText) => {
                    if (status !== 200) {
                        reject(responseText);
                    }
                    resolve(responseText);
                }
            );
        });
    }

    promisifyPostSignUp(url: string, data: any) {
        return new Promise((resolve, reject) => {
            this._ajax(
                url,
                'POST',
                data,
                (status, responseText) => {
                    if (status !== 200) {
                        reject(responseText);
                    }
                    resolve(data);
                }
            );
        });
    }

    promisifyPostSignIn(url: string, data: any) {
        return new Promise<void>((resolve, reject) => {
            this._ajax(
                url,
                'POST',
                data,
                (status: number, responseText: string) => {
                    if (status !== 200) {
                        reject(responseText);
                    }
                    resolve();
                }
            );
        });
    }
}