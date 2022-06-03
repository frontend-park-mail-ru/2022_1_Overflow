import './PopUp.scss';
import './PopUpItem/PopUpItem.scss';
import * as templateHBS from './PopUp.hbs';
import * as templateItemHBS from './PopUpItem/PopUpItem.hbs';
import arrowSvg from '../../View/image/Blue/arrow.svg'
import {IPopUp} from "./IPopUp";


export class PopUp {
    private readonly props: IPopUp;

    constructor(
        {
            size = 'L',
            content = [{id: '', icon: '', type: '', text: '', href: ''}],
            id,
            classNameDiv = '',
        }: IPopUp) {
        this.props = {
            size,
            content,
            id,
            classNameDiv,
        };
    }

    render = () => {
        const popUpItemsHbs: string[] = [];
        this.props.content.forEach((item) => {
            popUpItemsHbs.push(
                templateItemHBS({
                    id: item.id,
                    href: item.href,
                    img: item.icon,
                    text: item.text,
                    type: item.type,
                    arrowSvg: arrowSvg,
                })
            )
        });
        return templateHBS({id: this.props.id, classNameDiv: this.props.classNameDiv, items: popUpItemsHbs});
    };
}