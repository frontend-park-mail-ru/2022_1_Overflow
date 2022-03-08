import {safe} from '../Safe/safe.js';

export const CheckInput = (str) => {
    str = safe(str);
    str.trim();
    if (str.length < 2) {
        return '';
    }
    return str;
};