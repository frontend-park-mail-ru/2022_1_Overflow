export const LengthCheckUsername = (text: string | null, type: string) => {
    if (text === null) {
        return 'null';
    }
    const regexp = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/

    if (text.length === 0) {
        return `Поле ${type} является пустым`;
    }

    if (text.match(regexp) === null || text.length > 45) {
        return `Поле ${type} не должно быть более 45 символов и содержать только строчные и заглавные латинские буквы, либо цифры`;
    }
    return '';
};

export const LengthCheckPasswordAndName = (text: string | null, type: string) => {
    if (text === null) {
        return 'null';
    }

    if (text.length === 0) {
        return `Поле ${type} является пустым`;
    }

    if (text.length > 45) {
        return `Поле ${type} не должно быть более 45 символов`;
    }
    return '';
};