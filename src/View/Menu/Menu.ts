import './Menu.scss';
import inputSvg from '../image/input.svg';
import outSvg from '../image/out.svg';
import editSvg from '../image/edit.svg';
import * as menuItem from './MenuItem/MenuItem.hbs';
import './MenuItem/MenuItem.scss';
import * as mainHBS from './Menu.hbs';
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {Text} from "../../ui-kit/Text/Text";

const itemsMenu = [
    {
        iconName: editSvg,
        textText: 'Написать',
        id: 'send'
    },
    {
        iconName: inputSvg,
        textText: 'Входящие',
        id: 'input'
    },
    {
        iconName: outSvg,
        textText: 'Отправленные',
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
            const text = new Text({
                color: 'Black',
                text: item.textText,
                size: 'L',
                className: 'menuText1'
            });
            items.push(menuItem({
                icon: item.iconName,
                id: item.id,
                text: text.render(),
            }));
        });

        const main = mainHBS({
            idMain: 'main',
            items: items,
        });

        this.parent.insertAdjacentHTML('beforeend', main);

        document.getElementById('send')!.addEventListener('click', () => {
            eventEmitter.goToSendMessage(null, 'default');
        });
        document.getElementById('input')!.addEventListener('click', () => {
            eventEmitter.goToMainPage(1);
        } );
        document.getElementById('output')!.addEventListener('click', () => {
            eventEmitter.goToMainPage(2);
        } );
    };
}
