import {safe} from '../Safe/safe.js';

export const CheckInput = (str) => {
    str = safe(str);
    str.trim();
    return str;
};