import './SendMessage.scss';
import './SendMessageError.scss'
import * as sendMessageHbs from './SendMessage.hbs';
import * as sendMessageErrorHbs from './SendMessageError.hbs'
import avatar from '../image/dummy.svg';
import {Text} from '../../ui-kit/Text/Text'
import {Input} from '../../ui-kit/Input/Input'
import {Button} from "../../ui-kit/Button/Button";
import {PopUpSendMessageError} from "../PopUpSendMessageError/PopUpSendMessageError";

export class SendMessage<T extends Element> {
    private readonly parent: T;
    private readonly data: {avatar: any, login: string, theme: string, date: any, id: number, text: string} | null;

    constructor(parent: T, data: {avatar: any, login: string, theme: string, date: any, id: number, text: string} | null) {
        this.parent = parent;
        this.data = data;
    }

    setError() {
        const root = document.getElementsByTagName('body')[0];
        if (!root) {
            return;
        }

        const popUpError = new PopUpSendMessageError(root);
        popUpError.render();
        popUpError.emitClose();
    }

    eventsLoginChange(handler: any) {
        const inputLogin = document.getElementById('inputLogin') as HTMLInputElement;
        if (!inputLogin) {
            return;
        }
        inputLogin.addEventListener('blur', () => {
            handler(inputLogin.value);
        })
    }

    setAvatar(path: string) {
        const avatar = document.getElementById('sendAvatar') as HTMLImageElement;
        if (!avatar) {
            return;
        }
        avatar.src = `http://${window.location.hostname}:8080/${path}`
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
            console.log(inputLoginText, themeInputText, textareaMainText);
            if (!inputLoginText || !themeInputText || !textareaMainText) {
                return;
            }
            console.log(inputLoginText, themeInputText, textareaMainText);
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
            text: '',
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
            text: '',
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
