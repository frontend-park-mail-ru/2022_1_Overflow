import {CheckInput} from '../CheckInput/CheckInput';

export const LenghtCheck = (text: string | null, type: string) => {
    text = CheckInput(text);
    if (text.length === 0) {
        return `Поле ${type} является пустым.`;
    }
    if (text.length > 20) {
        return `Длинна ${type} слишком большая.`;
    }
    return '';
};