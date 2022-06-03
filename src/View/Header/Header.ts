import './Header.scss';
import {color} from "../image/ColorSetter/ColorSetter";
import menuSvg from '../image/Blue/menu.svg';
import arrowSvg from '../image/Blue/arrow.svg';
import {Text} from '../../Ui-kit/Text/Text';
import * as headerHBS from './Header.hbs';
import {PopUp} from "../../Ui-kit/Dropdown/PopUp";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";
import {http} from "../../index";


export class Header<T extends Element> {
    private readonly parent: T;
    private readonly data: {name: string; avatar: string};
    private readonly popUp;
    private isLoading: boolean;

    constructor(parent: T, data: {name: string, avatar: string}) {
        this.parent = parent;
        this.data = data;
        this.popUp = {
            id: 'popUp',
            content: [
                {
                    icon: color.getData().svg.profile,
                    text: 'Профиль',
                    href: urlsRouter.profile,
                    id: 'profile',
                },
                {
                    icon: color.getData().svg.door,
                    text: 'Выход',
                    id: 'exit',
                },
            ],
            classNameDiv: 'positionPopUpExit',
        }
        this.isLoading = false;
    }

    evenPopUp = (handler: () => void) => {
        const profile = document.querySelector('.profile');
        if (profile === null)
            return;
        let profileEvent: EventListenerOrEventListenerObject;
        profile.addEventListener('click', profileEvent = (event) => {
            const popUpNew = new PopUp(this.popUp);
            this.parent.insertAdjacentHTML('beforeend', popUpNew.render());
            event.stopPropagation();
            profile.removeEventListener('click', profileEvent);
            let docEvent: EventListenerOrEventListenerObject;
            document.addEventListener('click', docEvent = (event2) => {
                let target: HTMLElement | null = event2.target as HTMLElement;
                while (target) {
                    if (target?.id === 'exit') {
                        if (this.isLoading) {
                            return;
                        }
                        this.isLoading = true;
                        document.removeEventListener('click', docEvent);
                        handler();
                        return;
                    }

                    if (target?.id === 'profile') {
                        if (this.isLoading) {
                            return;
                        }
                        this.isLoading = true;
                        document.removeEventListener('click', docEvent);
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

    eventSetColor = () => {
        const colors = document.getElementById('color');
        if (!colors) {
            return;
        }
        const event = () => {
            color.setPink(true);
        }
        colors.addEventListener('click', event);
    }

    render = () => {
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
            logoSvg: color.getData().svg.Logo,
            menuSvg: menuSvg,
            login: login.render(),
            logoText: logoText.render(),
            profileAvatar: `${http}://${window.location.hostname}${this.data.avatar}`,
            arrow: arrowSvg,
        })

        this.parent.insertAdjacentHTML('beforeend', header);

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
        this.eventSetColor();
    }
}