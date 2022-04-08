import * as messageSoloHbs from './MessageSolo.hbs';
import avatar from '../image/avatar.svg';
import {Text} from '../../ui-kit/Text/Text'
import {Input} from '../../ui-kit/Input/Input'
import {Button} from "../../ui-kit/Button/Button";
import './MessageSolo.css';

export class MessageSolo<T extends Element> {
    private readonly parent: T;

    constructor(parent: T) {
        this.parent = parent;
    }

    render() {
        const who = new Text({
            color: 'Black',
            size: 'L',
            text: 'Кому:',
            id: 'who',
        });

        const inputLogin = new Input({
            type: 'text',
            id: 'inputLogin',
            size: 'Empty',
            text: 'Кому',
        });

        const theme = new Text({
            color: 'Black',
            size: 'L',
            text: 'Тема:',
            id: 'theme',
        });

        const themeInput = new Input({
            type: 'text',
            id: 'themeInput',
            size: 'Empty',
            text: 'Тема',
        });

        const send = new Button({
            id: 'send',
            text: 'Отправит',
            type: 'button',
            size: 'S',
            className: 'btnClassOutput',
        })


        //this.parent.insertAdjacentHTML('beforeend', template);
    }
}
