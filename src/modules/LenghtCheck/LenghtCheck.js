import {CheckInput} from '../CheckInput/CheckInput.js'

export const LenghtCheck = (text, type) => {
    text = CheckInput(text);
    if (text.length <= 2) {
        return `Длинна ${type} слишком маленькая.`;
    }
    if (text.length > 20) {
        return `Длинна ${type} слишком большая.`;
    }
    return '';
}