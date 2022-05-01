import './SendMessage.scss';
import './SendMessageError.scss'
import * as sendMessageHbs from './SendMessage.hbs';
import avatar from '../image/dummy.svg';
import {Text} from '../../ui-kit/Text/Text'
import {Input} from '../../ui-kit/Input/Input'
import {Button} from "../../ui-kit/Button/Button";
import {PopUpError} from "../../ui-kit/PopUpError/PopUpError";
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";

export class SendMessage<T extends Element> {
    private readonly parent: T;
    private readonly data: {avatar: any, login: string, theme: string, date: any, id: number, text: string} | null;

    constructor(parent: T, data: {avatar: any, login: string, theme: string, date: any, id: number, text: string} | null) {
        this.parent = parent;
        this.data = data;
    }

    setErrorTheme = (obj: {text: string, handler: any}) => {
        const root = document.getElementsByTagName('body')[0];
        if (!root) {
            return;
        }

        const primBtn = new Button({
            size: 'S',
            id: 'primBtn',
            text: 'Отправить',
            type: 'button',
        });

        const secBtn = new Button({
            size: 'S',
            variant: 'Secondary',
            id: 'secBtn',
            text: 'Закрыть',
            type: 'button',
        });

        const popUpError = new PopUpError({
            secBtn: secBtn.render(),
            primBtn: primBtn.render(),
            text: obj.text,
            id: 'popUpError',
        });
        root.insertAdjacentHTML('beforeend', popUpError.render());

        const btnClose = document.getElementById('secBtn');
        if (!btnClose) {
            return;
        }

        btnClose.addEventListener('click', () => {
            const popUp = document.getElementById('popUpError');
            if (!popUp) {
                return;
            }
            popUp.remove();
        });

        const btnSend = document.getElementById('primBtn');
        if (!btnSend) {
            return;
        }

        btnSend.addEventListener('click', async () => {
            const popUp = document.getElementById('popUpError');
            if (!popUp) {
                return;
            }
            let form = this.getForm();
            if (!form) {
                return;
            }
            form.theme = 'Без темы';
            popUp.remove();
            await obj.handler(form);
        });
    }

    setError = (text: string) => {
        const root = document.getElementsByTagName('body')[0];
        if (!root) {
            return;
        }

        const secBtn = new Button({
            size: 'S',
            variant: 'Secondary',
            id: 'secBtn',
            text: 'Закрыть',
            type: 'button',
        });

        const popUpError = new PopUpError({
            secBtn: secBtn.render(),
            text: text,
            id: 'popUpError',
        });
        root.insertAdjacentHTML('beforeend', popUpError.render());

        const btnClose = document.getElementById('secBtn');
        if (!btnClose) {
            return;
        }

        btnClose.addEventListener('click', () => {
            const popUp = document.getElementById('popUpError');
            if (!popUp) {
                return;
            }
            popUp.remove();
        });
    }

    eventsLoginChange = (handler: (value: string) => void) => {
        const inputLogin = document.getElementById('inputLogin') as HTMLInputElement;
        if (!inputLogin) {
            return;
        }

        inputLogin.addEventListener('blur', () => {
            if (inputLogin.value !== '') {
                handler(inputLogin.value);
            }
        })
    }

    setAvatar = (path: string) => {
        const avatar = document.getElementById('sendAvatar') as HTMLImageElement;
        if (!avatar) {
            return;
        }
        avatar.src = `http://${window.location.hostname}:8080/${path}`
    }

    getForm = () => {
        const inputLoginText = document.getElementById('inputLogin') as HTMLInputElement;
        const themeInputText = document.getElementById('themeInput') as HTMLInputElement;
        const textareaMainText = document.getElementById('textareaMain') as HTMLInputElement;
        if (!inputLoginText || !themeInputText || !textareaMainText) {
            return;
        }

        return {
            addressee: inputLoginText.value,
            files: '',
            text: textareaMainText.value,
            theme: themeInputText.value,
        };
    }

    send(handler: any) {
        const sendMessage = document.getElementById('sendButton');
        if (!sendMessage) {
            return;
        }
        sendMessage.addEventListener('click', async () => {
            await handler(this.getForm());
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
            realText: this.data !== null ? this.data.login : '',
            classNameDiv: 'divWidth',
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
            realText: this.data !== null ? this.data.theme : '',
            classNameDiv: 'divWidth',
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
