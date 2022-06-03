import './Profile.scss';
import {Button} from "../../Ui-kit/Button/Button";
import {Input} from "../../Ui-kit/Input/Input";
import * as securityHbs from './Security.hbs';
import * as profileItemsHbs from './ProfileItem/ProfileItem.hbs';
import './ProfileItem/ProfileItem.scss'
import {Text} from "../../Ui-kit/Text/Text";
import strokeSvg from "../image/Blue/stroke.svg";
import {router} from "../../Presenter/Router/Router";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";
import {color} from "../image/ColorSetter/ColorSetter";

const itemsMenu = [
    {
        iconName: color.getData().svg.profile,
        textText: 'Профиль',
        href: urlsRouter.profile,
        id: 'profile'
    },
    {
        iconName: color.getData().svg.lock,
        textText: 'Безопасность',
        href: urlsRouter.security,
        id: 'security'
    },
];

export class Security<T extends Element> {
    private readonly parent: T;

    constructor(parent: T) {
        this.parent = parent;
    }

    setError = (data: {text: string, type: string}) => {
        const input = document.getElementById(`input${data.type}`);
        if (!input) {
            return;
        }
        input.classList.remove('inputXL');
        input.classList.add('inputXLError');

        const error = document.getElementById(`error${data.type}`) as HTMLDivElement;
        if (!error) {
            return;
        }
        error.style.visibility = 'visible';
        error.textContent = data.text;
    }

    getForm = () => {
        const lastPassword: string = (document.getElementById('inputLastPassword') as HTMLInputElement).value;
        const password: string = (document.getElementById('inputPassword') as HTMLInputElement).value;
        const passwordRepeat: string = (document.getElementById('inputPasswordRepeat') as HTMLInputElement).value;
        return {last_password: lastPassword, password: password, password_repeat: passwordRepeat};
    }

    cleanError = (type: string) => {
        const input = document.getElementById(`input${type}`);
        if (!input) {
            return;
        }
        input.classList.remove('inputXLError');
        input.classList.add('inputXL');

        const error = document.getElementById(`error${type}`) as HTMLDivElement;
        if (!error) {
            return;
        }
        error.style.visibility = 'hidden';
        error.textContent = '';
    }

    submitForm = (handler: (form: {password: string; last_password: string; password_repeat: string}) => void) => {
        const prev = document.getElementById('prev');
        if (prev === null) {
            return;
        }
        prev.addEventListener('click', () => {
            router.redirect(urlsRouter.income);
        });

        const form = document.getElementById('form');
        if (form === null)
            return;
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            this.cleanError('LastPassword');
            this.cleanError('Password');
            this.cleanError('PasswordRepeat');
            await handler(this.getForm());
        });
    }

    setCurrentPath() {
        const allElem = document.getElementById('menuProfileItems');
        if (!allElem) {
            return;
        }
        allElem.childNodes.forEach((item) => {
            if (item instanceof HTMLAnchorElement) {
                let href = item.href;
                const re1 = /https:\/\/(.+?)\//;
                href = href.replace(re1, '');
                href = '/' + href;
                const arrHref = href.split('/');
                const arrHrefPath = router.getCurrentPath().split('/');
                if (arrHref[1] === arrHrefPath[1] && href !== '/') {
                    if (arrHref[1] === 'folder' && arrHrefPath[1] === 'folder') {
                        if (arrHref[2] === arrHrefPath[2]) {
                            item.style.backgroundColor = "#CBCBCB";
                        } else {
                            item.style.backgroundColor = '';
                        }
                    } else {
                        item.style.backgroundColor = "#CBCBCB";
                    }
                } else {
                    item.style.backgroundColor = '';
                }
            }
        })
    }

    render = () => {
        const main = document.getElementById('blockProfileMain');
        const items: string[] = [];
        if (!main) {
            itemsMenu.forEach((item, idx) => {
                const text = new Text({
                    color: 'Black',
                    text: item.textText,
                    size: 'L',
                    className: 'menuText1'
                });
                if (idx === 0) {
                    items.push(profileItemsHbs(
                        {
                            svg: item.iconName,
                            text: text.render(),
                            href: item.href,
                            id: item.id,
                            empty: true,
                        })
                    );
                } else {
                    items.push(profileItemsHbs(
                        {
                            svg: item.iconName,
                            text: text.render(),
                            href: item.href,
                            id: item.id,
                            empty: false,
                        })
                    );
                }
            });
        }

        const lastPassword = new Input({
            text: 'Старый пароль',
            size: 'XL',
            id: 'inputLastPassword',
            type: 'password',
            classNameDiv: 'marginForm',
        });

        const password = new Input({
            text: 'Новый пароль',
            id: 'inputPassword',
            size: 'XL',
            type: 'password',
            classNameDiv: 'marginForm',
        });

        const passwordRepeat = new Input({
            text: 'Повтор нового пароль',
            id: 'inputPasswordRepeat',
            size: 'XL',
            type: 'password',
            classNameDiv: 'marginForm',
        });

        const primBtn = new Button({
            text: 'Сохранить',
            size: 'XL',
            id: 'set',
            type: 'submit',
            className: 'marginForm',
        });

        const secBtn = new Button({
            variant: 'Secondary',
            text: 'Назад',
            size: 'XL',
            id: 'prev',
            className: 'btnMarginTop',
        });

        const template = securityHbs({
            items: items,
            logo: color.getData().svg.logoAndTitle,
            inputPasswordLast: lastPassword.render(),
            inputPassword: password.render(),
            inputPasswordRepeat: passwordRepeat.render(),
            nextBtn: primBtn.render(),
            prevBtn: secBtn.render(),
            strokeSvg: strokeSvg,
        });

        if (main) {
            main.innerHTML = '';
            main.insertAdjacentHTML('beforeend', template);
        } else {
            this.parent.insertAdjacentHTML('beforeend', template);
        }
    }
}
