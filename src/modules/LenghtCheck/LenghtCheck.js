import {checkInput} from '../CheckInput/CheckInput.js';

export const LenghtCheck = (text, type) => {
    text = checkInput(text);
    if (text.length === 0) {
        return `Поле ${type} является пустым.`;
    }
    if (text.length > 20) {
        return `Длинна ${type} слишком большая.`;
    }
    return '';
};