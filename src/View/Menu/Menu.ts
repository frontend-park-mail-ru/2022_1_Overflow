import './Menu.css';
import inputSvg from '../image/input.svg';
import * as menuItem from './MenuItem/MenuItem.hbs';
import './MenuItem/MenuItem.css';
import * as mainHBS from './Menu.hbs';
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";

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
            eventEmitter.goToSendMessage();
        });
        document.getElementById('input')!.addEventListener('click', () => {
            eventEmitter.goToMainPage();
        } )
    };
}
