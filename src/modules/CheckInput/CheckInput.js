import {safe} from '../Safe/safe.js';

export const checkInput = (str) => {
    str = safe(str);
    str.trim();
    return str;
};

export const checkStatus = (status, user) => {
    if (status === 0){
        return '';
    }
    if (status === 1){
        return 'Внутренняя ошибка сервера';
    }
    if (status === 2){
        return 'Внутренняя ошибка сервера';
    }
    if (status === 3){
        return 'Внутренняя ошибка сервера';
    }
    if (status === 4){
        return 'Внутренняя ошибка сервера';
    }
    if (status === 5){
        return 'Внутренняя ошибка сервера';
    }
    if (status === 6){
        return 'Внутренняя ошибка сервера';
    }
    if (status === 7){
        return 'Отказано в доступе';
    }
    if (status === 8){
        return 'Внутренняя ошибка сервера';
    }
    if (status === 9){
        return 'Внутренняя ошибка сервера';
    }
    if (status === 10){
        return `Пользователь ${user} уже существует`;
    }
    if (status === 11){
        return 'Внутренняя ошибка сервера';
    }
    if (status === 12){
        return 'Внутренняя ошибка сервера';
    }
    if (status === 13){
        return 'Неверная пара логин/пароль';
    }
    if (status === 14){
        return 'Пользователь уже выполнил вход';
    }
};