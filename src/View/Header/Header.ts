import './Header.scss';
import {color} from "../image/ColorSetter/ColorSetter";
import menuSvg from '../image/Blue/menu.svg';
import arrowSvg from '../image/Blue/arrow.svg';
import {Text} from '../../Ui-kit/Text/Text';
import * as headerHBS from './Header.hbs';
import {PopUp} from "../../Ui-kit/Dropdown/PopUp";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";
import {http} from "../../index";
import setter from "../image/Blue/new_setter.svg";
import setter_g from "../image/Green/setter_g.svg";
import setter_b from "../image/Blue/setter_b.svg";
import setter_p from "../image/Pink/setter_p.svg";
import setter_o from "../image/Orange/setter_o.svg";


export class Header<T extends Element> {
    private readonly parent: T;
    private readonly data: { name: string; avatar: string };
    private readonly popUp;
    private readonly popUpColor;
    private isLoading: boolean;

    constructor(parent: T, data: { name: string, avatar: string }) {
        this.parent = parent;
        this.data = data;
        this.popUpColor = {
            id: 'popUpColor',
            content: [
                {
                    icon: setter_b,
                    id: 'blue',
                },
                {
                    icon: setter_g,
                    id: 'green',
                },
                {
                    icon: setter_o,
                    id: 'orange',
                },
                {
                    icon: setter_p,
                    id: 'pink',
                },
            ],
            classNameDiv: 'positionPopUpColor',
        }
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
            event.stopPropagation();
            const popUpNew = new PopUp(this.popUp);
            this.parent.insertAdjacentHTML('beforeend', popUpNew.render());
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
        let profileEvent: EventListenerOrEventListenerObject;
        colors.addEventListener('click', profileEvent = (event) => {
            event.stopPropagation();
            const popUpNew = new PopUp(this.popUpColor);
            this.parent.insertAdjacentHTML('beforeend', popUpNew.render());
            const popUpPosition = document.getElementById('popUpColor');
            if (!popUpPosition) {
                return;
            }
            popUpPosition.style.width = '55px';
            colors.removeEventListener('click', profileEvent);
            let docEvent: EventListenerOrEventListenerObject;
            document.addEventListener('click', docEvent = (event2) => {
                let target: HTMLElement | null = event2.target as HTMLElement;
                while (target) {
                    if (target?.id === 'pink') {
                        if (this.isLoading) {
                            return;
                        }
                        this.isLoading = true;
                        color.setPink(true);
                        document.removeEventListener('click', docEvent);
                        const popUpFolder = document.getElementById('popUpColor');
                        if (popUpFolder === null)
                            return;
                        popUpFolder.remove();
                        return;
                    }

                    if (target?.id === 'blue') {
                        if (this.isLoading) {
                            return;
                        }
                        this.isLoading = true;
                        color.setBlue(true);
                        document.removeEventListener('click', docEvent);
                        const popUpFolder = document.getElementById('popUpColor');
                        if (popUpFolder === null)
                            return;
                        popUpFolder.remove();
                        return;
                    }

                    if (target?.id === 'green') {
                        if (this.isLoading) {
                            return;
                        }
                        this.isLoading = true;
                        color.setGreen(true);
                        document.removeEventListener('click', docEvent);
                        const popUpFolder = document.getElementById('popUpColor');
                        if (popUpFolder === null)
                            return;
                        popUpFolder.remove();
                        return;
                    }

                    if (target?.id === 'orange') {
                        if (this.isLoading) {
                            return;
                        }
                        this.isLoading = true;
                        color.setOrange(true);
                        document.removeEventListener('click', docEvent);
                        const popUpFolder = document.getElementById('popUpColor');
                        if (popUpFolder === null)
                            return;
                        popUpFolder.remove();
                        return;
                    }

                    target = target.parentElement;
                    if (target === null) {
                        const popUpFolder = document.getElementById('popUpColor');
                        if (popUpFolder === null)
                            return;
                        popUpFolder.remove();
                        document.removeEventListener('click', docEvent);
                        colors.addEventListener('click', profileEvent);
                        return;
                    }
                }
            });
        });
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
            setter: setter,
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