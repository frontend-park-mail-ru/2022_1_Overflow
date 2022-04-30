import './Menu.css';
import inputSvg from '../image/input.svg';
import * as menuItem from './MenuItem/MenuItem.hbs';
import './MenuItem/MenuItem.css';
import * as mainHBS from './Menu.hbs';
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import { router } from '../../Services/router/router';
import { frontUrls } from '../../Services/router/fronturls';

const itemsMenu = [
    {
        iconName: inputSvg,
        textText: 'Написать',
        id: 'send'
    },
    {
        iconName: inputSvg,
        textText: 'Входящие',
        id: 'input'
    },
    {
        iconName: inputSvg,
        textText: 'Исходящие',
        id: 'output'
    },
];

export class Menu<T extends Element> {
    private readonly parent: T;

    constructor(parent: T) {
        this.parent = parent;
    }

    render = () => {
        const items: string[] = [];

        itemsMenu.forEach((item) => {
            items.push(menuItem({
                icon: item.iconName,
                id: item.id,
                text: item.textText,
            }));
        });

        const main = mainHBS({
            idMain: 'main',
            items: items,
        });

        this.parent.insertAdjacentHTML('beforeend', main);

        document.getElementById('send')!.addEventListener('click', () => {
            eventEmitter.goToSendMessage(null, 1);
        });
        document.getElementById('input')!.addEventListener('click', () => {
            router.redirect(frontUrls.main)
        } );
        document.getElementById('output')!.addEventListener('click', () => {
            eventEmitter.goToMainPage(2);
        } );
    };
}
