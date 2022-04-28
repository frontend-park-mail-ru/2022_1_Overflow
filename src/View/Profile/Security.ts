import './Profile.scss';
import logoSvg from '../image/logoAndTitle.svg';
import {Button} from "../../ui-kit/Button/Button";
import {Input} from "../../ui-kit/Input/Input";
import * as securityHbs from './Security.hbs';
import * as profileItemsHbs from './ProfileItem/ProfileItem.hbs';
import lockSvg from "../image/lock.svg";
import profileSvg from "../image/profile.svg";
import './ProfileItem/ProfileItem.scss'
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {Text} from "../../ui-kit/Text/Text";
import strokeSvg from "../image/stroke.svg";

const itemsMenu = [
    {
        iconName: profileSvg,
        textText: 'Профиль',
        id: 'profile'
    },
    {
        iconName: lockSvg,
        textText: 'Безопасность',
        id: 'security'
    },
];

export class Security<T extends Element> {
    private readonly parent: T;

    constructor(parent: T) {
        this.parent = parent;
    }

    setError(data: {text: string, type: string}) {
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

    getForm() {
        const lastPassword: string = (document.getElementById('inputLastPassword') as HTMLInputElement).value;
        const password: string = (document.getElementById('inputPassword') as HTMLInputElement).value;
        const passwordRepeat: any = (document.getElementById('inputPasswordRepeat') as HTMLInputElement).value;
        return {last_password: lastPassword, password: password, password_repeat: passwordRepeat};
    }

    navigateBar() {
        const profile = document.getElementById('profile');
        if (profile === null) {
            return;
        }
        profile.addEventListener('click', () => {
            eventEmitter.goToProfile()
        });

        const security = document.getElementById('security');
        if (security === null) {
            return;
        }
        security.addEventListener('click', () => {
            eventEmitter.goToSecurity()
        });
    }

    submitForm(handler: any) {
        const prev = document.getElementById('prev');
        if (prev === null) {
            return;
        }
        prev.addEventListener('click', () => {
            eventEmitter.goToMainPage(1);
        });

        const form = document.getElementById('form');
        if (form === null)
            return;
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            await handler(this.getForm());
        });
    }

    render() {
        let items: any = [];
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
                        id: item.id,
                        empty: true,
                    })
                );
            } else {
                items.push(profileItemsHbs(
                    {
                        svg: item.iconName,
                        text: text.render(),
                        id: item.id,
                        empty: false,
                    })
                );
            }
        });

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
            text: 'Изменить',
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
            logo: logoSvg,
            inputPasswordLast: lastPassword.render(),
            inputPassword: password.render(),
            inputPasswordRepeat: passwordRepeat.render(),
            nextBtn: primBtn.render(),
            prevBtn: secBtn.render(),
            strokeSvg: strokeSvg,
        });

        this.parent.insertAdjacentHTML('beforeend', template);

        const stroke = document.getElementById('exit');
        if (!stroke) {
            return;
        }

        stroke.addEventListener('click', () => {
            eventEmitter.goToMainPage(1);
        });
    }
}
