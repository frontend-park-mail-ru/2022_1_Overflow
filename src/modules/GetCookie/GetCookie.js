export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        // eslint-disable-next-line
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}