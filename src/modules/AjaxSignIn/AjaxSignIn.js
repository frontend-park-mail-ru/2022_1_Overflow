const noop = () => {
};

export class Ajax {
    post(url, callback, data) {
        return this._ajax(
            url,
            'POST',
            data,
            callback,
        );
    }
    get(url, callback) {
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

        xhr.addEventListener('readystatechange', function () {
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

    promisifyGet(url) {
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

    promisifyPostSignUp(url, data) {
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

    promisifyPostSignIn(url, data) {
        return new Promise((resolve, reject) => {
            this._ajax(
                url,
                'POST',
                data,
                (status, responseText) => {
                    if (status !== 200) {
                        reject(responseText);
                    }
                    resolve(responseText);
                }
            );
        });
    }
}