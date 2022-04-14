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
        const password: string = (document.getElementById('password') as HTMLInputElement).value;
        return {first_name: name, last_name: lastName, password: password};
    }

    submitForm(handler: any) {
        const form = document.getElementById('displayForm');
        if (form === null)
            return;

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log(1);
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
            className: 'marginForm',
        });

        const inputProfileName = new Input({
            text: this.data.FirstName,
            size: 'XL',
            id: 'name',
            type: 'text',
            className: 'marginForm',
        });

        const inputProfileLastName = new Input({
            text: this.data.LastName,
            id: 'lastName',
            size: 'XL',
            type: 'text',
            className: 'marginForm',
        });

        const inputProfilePassword = new Input({
            text: this.data.password,
            id: 'password',
            size: 'XL',
            type: 'password',
            className: 'marginForm',
        });

        const primBtn = new Button({
            text: 'Изменить',
            size: 'XL',
            id: 'set',
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
            inputProfilePassword: inputProfilePassword.render(),
            nextBtn: primBtn.render(),
            prevBtn: secBtn.render(),
        });

        this.parent.insertAdjacentHTML('beforeend', template);

        const set = document.getElementById('set');
        const photos: any = document.getElementById('file');

        const formData = new FormData();

        formData.append('file', photos.files);

        set!.addEventListener('click', async () => {
            await fetch(`http://${window.location.hostname}:8080/profile/avatar/set`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            await fetch(`http://${window.location.hostname}:8080/profile/set`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.getForm()),
            });
            eventEmitter.goToMainPage();
        });

        const prev = document.getElementById('prev');
        prev!.addEventListener('click', () => {
            eventEmitter.goToMainPage();
        })
    }
}
