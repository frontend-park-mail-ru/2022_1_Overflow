import './index.scss';
import {eventEmitter} from "./Presenter/EventEmitter/EventEmitter";

const getProfile = async () => {
    try {
        const res = await fetch(`http://${window.location.hostname}:8080/profile`, {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (res.ok) {
            eventEmitter.goToMainPage('input', '');
        }

        if (!res.ok) {
            eventEmitter.goToSignIn();
        }
    } catch (e) {
        console.log(e);
    }
}

getProfile();
