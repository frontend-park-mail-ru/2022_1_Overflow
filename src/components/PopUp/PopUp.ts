import doorSvg from '../../image/door.svg';
import * as PopUpItem from './PopUpItem/PopUpItem.hbs';
import * as PopUpMain from './PopUp.hbs';
import './PopUp.css';
import './PopUpItem/PopUpItem.css'

export class PopUp<T extends Element> {
    private readonly parent: T;

    constructor(parent: T) {
        this.parent = parent;
    }

    render() {
        const popUpItems: any[] = [];

        popUpItems.push(PopUpItem({
            img: doorSvg,
            text: 'Выход',
        }));

        const popUp = PopUpMain({
            items: popUpItems
        })


        this.parent.insertAdjacentHTML('beforeend', popUp);
    }
}