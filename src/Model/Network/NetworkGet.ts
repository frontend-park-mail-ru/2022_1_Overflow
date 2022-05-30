import {http} from "../../index";

export const getCSRFToken = async (url: string) => {
    try {
        const response = await fetch(`${http}://${window.location.hostname}/api/v1/get_token`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const header: string | null = response.headers.get('x-csrf-token');
        if (header === null) {
            return '';
        }
        return header;
    } catch (e) {
        console.error(e);
        return '';
    }
}