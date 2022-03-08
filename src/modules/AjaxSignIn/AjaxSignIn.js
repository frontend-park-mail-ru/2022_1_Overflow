const noop = () => {};

export class Ajax {
    post({url, callback, body}) {
        return this._ajax({
            url,
            callback,
            body,
            method: 'POST',
        })
    }

    _ajax({
              url = '/',
              method = 'POST',
              body = null,
              callback = noop
          }) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;

            callback(xhr.status, xhr.responseText);
        });

        if (body) {
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.send(JSON.stringify(body));
            return;
        }

        xhr.send();
    }
}