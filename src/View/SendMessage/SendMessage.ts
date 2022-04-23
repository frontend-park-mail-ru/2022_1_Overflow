import './SendMessage.scss';
import './SendMessageError.scss'
import * as sendMessageHbs from './SendMessage.hbs';
import * as sendMessageErrorHbs from './SendMessageError.hbs'
import avatar from '../image/avatar.svg';
import {Text} from '../../ui-kit/Text/Text'
import {Input} from '../../ui-kit/Input/Input'
import {Button} from "../../ui-kit/Button/Button";

export class SendMessage<T extends Element> {
    private readonly parent: T;
    private readonly data: {avatar: any, login: string, theme: string, date: any, id: number, text: string} | null;

    constructor(parent: T, data: {avatar: any, login: string, theme: string, date: any, id: number, text: string} | null) {
        this.parent = parent;
        this.data = data;
    }

    setError() {
        const errorDivExist = document.getElementById('messageErrorId');
        if (errorDivExist) {
            return;
        }
        const textError = new Text({
            color: 'Grey',
            text: ' Пользователя с таким логином не существует',
            size: 'XS',
        });

        const error = sendMessageErrorHbs({
            text: textError.render()
        });

        const main = document.getElementById('main');
        if (!main) {
            return;
        }

        main.insertAdjacentHTML('beforeend', error);

        const errorDiv = document.getElementById('messageErrorId');
        if (!errorDiv) {
            return;
        }

        let errorEvent: EventListenerOrEventListenerObject;
        errorDiv.addEventListener('click', errorEvent = () => {
            errorDiv.remove();
        })

        setTimeout(() => {
            errorDiv.removeEventListener('click', errorEvent);
            if (errorDiv) {
                errorDiv.remove();
            }
        }, 5000)
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
            text: 'Введите почту получателя',
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
            text: 'Напишите тему письма',
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
