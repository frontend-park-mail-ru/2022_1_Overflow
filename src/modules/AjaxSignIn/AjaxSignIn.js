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

    urlencodeFormData(fd) {
        let s = '';

        function encode(s) {
            return encodeURIComponent(s).replace(/%20/g, '+');
        }

        for (var pair of fd.entries()) {
            if (typeof pair[1] == 'string') {
                s += (s ? '&' : '') + encode(pair[0]) + '=' + encode(pair[1]);
            }
        }
        return s;
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
            const form = new FormData();
            for (const key in data) {
                form.append(key, data[key]);
            }

            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded ');
            xhr.send(this.urlencodeFormData(form));
            return;
        }

        xhr.send();
    }
}