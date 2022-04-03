const noop = (status: number, responseText: string) => {}; // eslint-disable-line

export class Ajax {
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