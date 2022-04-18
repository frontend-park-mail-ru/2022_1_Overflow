import './Profile.css';
import logoSvg from '../image/Logo.svg';
import {Button} from "../../ui-kit/Button/Button";
import {Input} from "../../ui-kit/Input/Input";
import editSvg from '../image/edit.svg';
import * as profileHbs from './Profile.hbs';
import * as profileItemsHbs from './ProfileItem/ProfileItem.hbs';
import lockSvg from "../image/lock.svg";
import profileSvg from "../image/profile.svg";
import './ProfileItem/ProfileItem.css'
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";

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

export class Profile<T extends Element> {
    private readonly parent: T;
    private readonly data: {Username: string, FirstName: string, LastName: string, avatar: any, password: string};

    constructor(parent: T, data: {Username: string, FirstName: string, LastName: string, avatar: any, password: string}) {
        this.parent = parent;
        this.data = data;
    }

    setError(text: string) {
        const name = document.getElementById('name');
        const lastName = document.getElementById('lastName');

        if (name === null || lastName === null) {
            return;
        }

        name.style.borderColor = 'red';
        lastName.style.borderColor = 'red';

        const error = document.getElementById('error') as HTMLElement;
        error.style.visibility = 'visible';
        error.textContent = text;
    }

    getForm() {
        const name: string = (document.getElementById('name') as HTMLInputElement).value;
        const lastName: string = (document.getElementById('lastName') as HTMLInputElement).value;
        const avatar: any = document.getElementById('file');
        return {first_name: name, last_name: lastName, avatar: avatar.files[0]};
    }

    submitForm(handler: any) {
        const prev = document.getElementById('prev');
        if (prev === null) {
            return;
        }
        prev.addEventListener('click', () => {
            eventEmitter.goToMainPage(1);
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
            const target = event.target as HTMLInputElement;
            const profileSvg = (document.getElementById('profileSvg') as HTMLImageElement)
            if (profileSvg === null) {
                return;
            }
            // export const makeBlobUrl = (file: File): string | undefined => {
            //     if (!file) return undefined;
            //
            //     return URL.createObjectURL(file);
            // };
            // profileSvg.src = make
        })

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
        itemsMenu.forEach((item) => {
            items.push(profileItemsHbs(
                {
                    svg: item.iconName,
                    text: item.textText,
                    id: item.id,
                }));
        });

        const inputFile = new Input({
            text: 'avatar',
            id: 'file',
            size: 'XL',
            type: 'file',
            className: 'marginForm hiddenFrom',
        });

        const inputProfileName = new Input({
            realText: this.data.FirstName,
            text: 'Имя',
            size: 'XL',
            id: 'name',
            type: 'text',
            className: 'marginForm',
        });

        const inputProfileLastName = new Input({
            realText: this.data.LastName,
            text: 'Фамиля',
            id: 'lastName',
            size: 'XL',
            type: 'text',
            className: 'marginForm',
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
        });

        this.parent.insertAdjacentHTML('beforeend', template);
    }
}
