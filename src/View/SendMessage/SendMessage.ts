import './SendMessage.css';
import * as sendMessageHbs from './SendMessage.hbs';
import avatar from '../image/avatar.svg';
import {Text} from '../../ui-kit/Text/Text'
import {Input} from '../../ui-kit/Input/Input'
import {Button} from "../../ui-kit/Button/Button";

export class SendMessage<T extends Element> {
    private readonly parent: T;
    private readonly data: {avatar: any, login: string, theme: string, date: any, text: string} | null;

    constructor(parent: T, data: {avatar: any, login: string, theme: string, date: any, text: string} | null) {
        this.parent = parent;
        this.data = data;
    }

    send(handler: any) {
        const sendMessage = document.getElementById('sendButton');
        if (!sendMessage) {
            return;
        }
        sendMessage.addEventListener('click', async () => {
            const inputLoginText: string = (document.getElementById('inputLogin') as HTMLInputElement).value;
            const themeInputText: string = (document.getElementById('themeInput') as HTMLInputElement).value;
            const textareaMainText: string = (document.getElementById('textareaMain') as HTMLTextAreaElement).value;
            if (!inputLoginText || !themeInputText || !textareaMainText) {
                return
            }
            await handler({
                addressee: inputLoginText,
                files: '',
                text: textareaMainText,
                theme: themeInputText,
            });
        });
    }

    render() {
        const who = new Text({
            color: 'Black',
            text: 'Кому:',
            id: 'who',
        });

        const inputLogin = new Input({
            type: 'text',
            id: 'inputLogin',
            size: 'Empty',
            text: 'Кому',
            realText: this.data !== null ? this.data.login : ''
        });

        const theme = new Text({
            color: 'Black',
            text: 'Тема:',
            id: 'theme',
        });

        const themeInput = new Input({
            type: 'text',
            id: 'themeInput',
            size: 'Empty',
            text: 'Тема',
            realText: this.data !== null ? this.data.theme : ''
        });

        const send = new Button({
            id: 'sendButton',
            text: 'Отправить',
            type: 'button',
            size: 'S',
            className: 'btnClassOutput',
        });

        const template = sendMessageHbs({
            avatar: avatar,
            who: who.render(),
            login: inputLogin.render(),
            theme: theme.render(),
            themeInput: themeInput.render(),
            text: this.data !== null ? this.data.text : '',
            send: send.render(),
        });

        this.parent.insertAdjacentHTML('beforeend', template);
    }
}
