const noop = (status: number, responseText: string) => {}; // eslint-disable-line

export class Ajax {
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
}