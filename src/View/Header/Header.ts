import './Header.scss';
import logoSvg from '../image/Logo.svg';
import menuSvg from '../image/menu.svg';
import arrowSvg from '../image/arrow.svg';
import {Text} from '../../ui-kit/Text/Text';
import * as headerHBS from './Header.hbs';
import {PopUp} from "../../ui-kit/PopUp/PopUp";
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import doorSvg from "../image/door.svg";
import profileSvg from "../image/profile.svg";
import {isMobile} from "../../Utils/IsMobile/IsMobile";


export class Header<T extends Element> {
    private readonly parent: T;
    private readonly data: any;
    private readonly popUp;

    constructor(parent: T, data: any) {
        this.parent = parent;
        this.data = data;
        this.popUp = {
            id: 'popUp',
            content: [
                {
                    icon: profileSvg,
                    text: 'Профиль',
                    id: 'profile',
                },
                {
                    icon: doorSvg,
                    text: 'Выход',
                    id: 'exit',
                },
            ],
            classNameDiv: 'positionPopUpExit',
        }
    }

    evenPopUp(handler: any) {
        const profile = document.querySelector('.profile');
        if (profile === null)
            return;
        let profileEvent: EventListenerOrEventListenerObject;
        profile.addEventListener('click', profileEvent = (event: any) => {
            const popUpNew = new PopUp(this.popUp);
            this.parent.insertAdjacentHTML('beforeend', popUpNew.render());
            event.stopPropagation();
            profile.removeEventListener('click', profileEvent);
            let docEvent: EventListenerOrEventListenerObject;
            document.addEventListener('click', docEvent = (event2: any) => {
                let target: HTMLElement | null = event2.target as HTMLElement;
                while (target) {
                    if (target?.id === 'exit') {
                        document.removeEventListener('click', docEvent);
                        handler();
                        return;
                    }

                    if (target?.id === 'profile') {
                        document.removeEventListener('click', docEvent);
                        eventEmitter.goToProfile();
                        return;
                    }

                    target = target.parentElement;
                    if (target === null) {
                        const popUpFolder = document.getElementById('popUp');
                        if (popUpFolder === null)
                            return;
                        popUpFolder.remove();
                        document.removeEventListener('click', docEvent);
                        profile.addEventListener('click', profileEvent);
                        return;
                    }
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
            menuSvg: menuSvg,
            login: login.render(),
            logoText: logoText.render(),
            profileAvatar: `http://${window.location.hostname}:8080/${this.data.avatar}`,
            arrow: arrowSvg,
        })

        this.parent.insertAdjacentHTML('beforeend', header);

        if(isMobile()) {
            const menuOpen = document.getElementById('menuOpen');
            if (!menuOpen) {
                return;
            }

            const evenMenuClick = () => {
                const menu = document.getElementById('menu');
                if (!menu) {
                    return;
                }

                if (menu.style.display === 'flex') {
                    menu.style.display = 'none';
                } else {
                    menu.style.display = 'flex';
                }
            }

            menuOpen.addEventListener('click', evenMenuClick);
        }
    }
}