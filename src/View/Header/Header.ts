import './Header.css';
import logoSvg from '../image/Logo.svg';
import arrowSvg from '../image/arrow.svg';
import {Text} from '../../ui-kit/Text/Text';
import * as headerHBS from './Header.hbs';
import {PopUp} from "../PopUp/PopUp";
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";


export class Header<T extends Element> {
    private readonly parent: T;
    private readonly data: any;

    constructor(parent: T, data: any) {
        this.parent = parent;
        this.data = data;
    }

    evenPopUpExit(handler: any) {
        const profile = document.querySelector('.profile');
        if (profile === null)
            return;
        let profileEvent: EventListenerOrEventListenerObject;
        profile.addEventListener('click', profileEvent = (event: any) => {
            const popUp = new PopUp(this.parent);
            popUp.render();
            event.stopPropagation();
            profile.removeEventListener('click', profileEvent);
            let docEvent: EventListenerOrEventListenerObject;
            document.addEventListener('click', docEvent = (event2: MouseEvent) => {
                const target = event2.target as HTMLDivElement;
                if (!target)
                    return;
                if (target.id !== 'exit' && target.id !== 'profile') {
                    const target = document.querySelector('.openFolder');
                    if (target === null)
                        return;
                    target.remove();
                    document.removeEventListener('click', docEvent);
                    profile.addEventListener('click', profileEvent);
                }
                if (target.id === 'exit') {
                    document.removeEventListener('click', docEvent);
                    handler();
                }
                if (target.id === 'profile') {
                    document.removeEventListener('click', docEvent);
                    eventEmitter.goToProfile();
                }
            });
        });
    }

    render() {
        const logoText = new Text({
            color: 'White',
            text: 'OverMail',
            size: 'XL',
            className: 'logoTitle'
        });

        const login = new Text({
            id: 'profileLogin',
            text: this.data.name,
            size: 'S',
            className: 'email'
        });

        const header = headerHBS({
            logoLink: '/',
            logoSvg: logoSvg,
            login: login.render(),
            logoText: logoText.render(),
            profileAvatar: `http://${window.location.hostname}:8080/${this.data.avatar}`,
            arrow: arrowSvg,
        })

        this.parent.insertAdjacentHTML('beforeend', header);
    }
}