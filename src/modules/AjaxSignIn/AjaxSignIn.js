const noop = () => {};

export class Ajax {
    post(url, callback, data) {
        return this._ajax(
            url,
            'POST',
            data,
            callback,
        )
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

        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            console.log(callback);
            callback(xhr.status, xhr.responseText);
        });

        if (data) {
            const form = new FormData();
            for (const key in data) {
                form.append(key, data[key]);
            }

            //xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
            //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.send(form);
            return;
        }

        xhr.send();
    }
}