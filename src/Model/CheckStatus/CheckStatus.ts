export const checkStatus = (status: number, user: string) => {
    if (status === 0) {
        return '';
    } else if (status === 7) {
        return 'Отказано в доступе';
    } else if (status === 10) {
        return `Пользователь ${user} уже существует`;
    } else if (status === 13) {
        return 'Неверная пара логин/пароль';
    } else if (status === 14) {
        return 'Пользователь уже выполнил вход';
    } else {
        return 'Внутренняя ошибка сервера';
    }
};