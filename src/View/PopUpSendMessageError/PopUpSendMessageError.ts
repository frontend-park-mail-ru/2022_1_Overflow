import * as PopUpSendMessageErrorHbs from './PopUpSendMessageError.hbs';
import './PopUpSendMessageError.scss';
import {Text} from "../../ui-kit/Text/Text";
import {Button} from "../../ui-kit/Button/Button";

export class PopUpSendMessageError<T extends Element> {
    private readonly parent: T;

    constructor(parent: T) {
        this.parent = parent;
    }

    emitClose() {
        const content = document.getElementById('bigBox');
        if (!content) {
            return;
        }

        const btn = document.getElementById('btn');
        if (!btn) {
            return;
        }

        btn.addEventListener('click', () => {
            content.remove();
        })
    }

    render() {
        const text = new Text({
            size: 'L',
            text: 'Вы пытаетесь отправить сообщение несуществующему пользователю',
        });

        const btn = new Button({
            id: 'btn',
            variant: 'Secondary',
            type: 'button',
            size: 'S',
            text: 'Закрыть',
        });

        const popUp = PopUpSendMessageErrorHbs({
            text: text.render(),
            button: btn.render(),
        });
        this.parent.insertAdjacentHTML('beforeend', popUp);
    }
}