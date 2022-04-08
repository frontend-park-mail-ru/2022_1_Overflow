import './Menu.css';
import inputSvg from '../image/input.svg';
import * as menuItem from './MenuItem/MenuItem.hbs';
import './MenuItem/MenuItem.css';
import * as mainHBS from './Menu.hbs';

const itemsMenu = [
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
    };
}
