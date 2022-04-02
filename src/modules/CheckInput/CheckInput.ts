import {safe} from '../Safe/safe';

export const CheckInput = (str: string | null) => {
    str = safe(str);
    str.trim();
    return str;
};