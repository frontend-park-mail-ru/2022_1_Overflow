import './Profile.scss';
import logoSvg from '../image/logoAndTitle.svg';
import strokeSvg from '../image/stroke.svg';
import {Button} from "../../Ui-kit/Button/Button";
import {Input} from "../../Ui-kit/Input/Input";
import editSvg from '../image/edit.svg';
import * as profileHbs from './Profile.hbs';
import * as profileItemsHbs from './ProfileItem/ProfileItem.hbs';
import lockSvg from "../image/lock.svg";
import profileSvg from "../image/profile.svg";
import './ProfileItem/ProfileItem.scss'
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {Text} from "../../Ui-kit/Text/Text";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";
import {router} from "../../Presenter/Router/Router";

const itemsMenu = [
    {
        iconName: profileSvg,
        textText: 'Профиль',
        href: urlsRouter.profile,
        id: 'profile'
    },
    {
        iconName: lockSvg,
        textText: 'Безопасность',
        href: urlsRouter.security,
        id: 'security'
    },
];

export class Profile<T extends Element> {
    private readonly parent: T;
    private readonly data: {Username: string, FirstName: string, LastName: string, avatar: string, password: string};

    constructor(parent: T, data: {Username: string, FirstName: string, LastName: string, avatar: string, password: string}) {
        this.parent = parent;
        this.data = data;
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
        const name: string = (document.getElementById('inputFirstName') as HTMLInputElement).value;
        const lastName: string = (document.getElementById('inputLastName') as HTMLInputElement).value;
        const avatar: any = (document.getElementById('file') as HTMLInputElement);
        return {first_name: name, last_name: lastName, avatar: avatar.files[0]};
    }

    submitForm = (handler: any) => {
        const prev = document.getElementById('prev');
        if (prev === null) {
            return;
        }
        prev.addEventListener('click', () => {
            router.redirect(urlsRouter.income);
        });

        const file = (document.getElementById('file') as HTMLInputElement);
        if (file === null) {
            return;
        }

        const avatar = document.getElementById('img');
        if (avatar === null) {
            return;
        }

        avatar.addEventListener('click', () => {
            file.click();
        });

        file.addEventListener('change', (event: Event) => {
            const target = (event.target as HTMLInputElement);
            const profileSvg = (document.getElementById('profileSvg') as HTMLImageElement)
            if (profileSvg === null || target.files === null) {
                return;
            }
            profileSvg.src = URL.createObjectURL(target.files[0]);
        });

        const form = document.getElementById('form');
        if (form === null)
            return;
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            await handler(this.getForm());
        });
    }

    render = () => {
        const items: string[] = [];
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
                    }));
            } else {
                items.push(profileItemsHbs(
                    {
                        svg: item.iconName,
                        text: text.render(),
                        href: item.href,
                        id: item.id,
                        empty: false,
                    }));
            }
        });

        const inputFile = new Input({
            text: 'avatar',
            id: 'file',
            size: 'XL',
            type: 'file',
            classNameDiv: 'marginForm hiddenForm',
        });

        const inputProfileName = new Input({
            realText: this.data.FirstName,
            text: 'Имя',
            size: 'XL',
            id: 'inputFirstName',
            type: 'text',
            classNameDiv: 'marginForm',
        });

        const inputProfileLastName = new Input({
            realText: this.data.LastName,
            text: 'Фамилия',
            id: 'inputLastName',
            size: 'XL',
            type: 'text',
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

        const template = profileHbs({
            items: items,
            logo: logoSvg,
            inputFile: inputFile.render(),
            profileSvg: `http://${window.location.hostname}:8080/${this.data.avatar}`,
            editSvg: editSvg,
            inputProfileName: inputProfileName.render(),
            inputProfileLastName: inputProfileLastName.render(),
            nextBtn: primBtn.render(),
            prevBtn: secBtn.render(),
            strokeSvg: strokeSvg,
        });

        this.parent.insertAdjacentHTML('beforeend', template);
    }
}
