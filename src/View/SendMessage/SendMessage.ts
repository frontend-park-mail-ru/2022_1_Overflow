import './SendMessage.scss';
import './SendMessageError.scss'
import * as sendMessageHbs from './SendMessage.hbs';
import avatar from '../image/dummy.svg';
import {Text} from '../../ui-kit/Text/Text'
import {Input} from '../../ui-kit/Input/Input'
import {Button} from "../../ui-kit/Button/Button";
import {PopUpError} from "../../ui-kit/PopUpError/PopUpError";
import {PopUp} from "../../ui-kit/PopUp/PopUp";
import {calcPositionXY} from "../../Utils/CalcPositionXY/CalcPositionXY";

export class SendMessage<T extends Element> {
    private readonly parent: T;
    private readonly data: {avatar: string, login: string, theme: string, date: string, id: number, text: string} | null;

    constructor(parent: T, data: {avatar: string, login: string, theme: string, date: string, id: number, text: string} | null) {
        this.parent = parent;
        this.data = data;
    }

    setErrorTheme = (obj: {text: string, handler: (form: {addressee: string, files: string, text: string, theme: string}) => void}) => {
        const root = document.getElementsByTagName('body')[0];
        if (!root) {
            return;
        }

        const primBtn = new Button({
            size: 'S',
            id: 'primBtn',
            text: 'Отправить',
            type: 'button',
            className: 'rightMargin',
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
            const form = this.getForm();
            if (!form) {
                return;
            }
            form.theme = 'Без темы';
            popUp.remove();
            await obj.handler(form);
        });

        const sendMessage = document.getElementById('sendButton');
        if (!sendMessage) {
            return;
        }
        sendMessage.removeAttribute("disabled");
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

        const sendMessage = document.getElementById('sendButton');
        if (!sendMessage) {
            return;
        }
        sendMessage.removeAttribute("disabled");
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
            return {
                addressee: '',
                files: '',
                text: '',
                theme: '',
            };
        }

        return {
            addressee: inputLoginText.value,
            files: '',
            text: textareaMainText.value,
            theme: themeInputText.value,
        };
    }

    send = (handler: (form: {addressee: string, files: string, theme: string, text: string}) => void) => {
        const sendMessage = document.getElementById('sendButton');
        if (!sendMessage) {
            return;
        }

        sendMessage.addEventListener('click', async () => {
            sendMessage.setAttribute("disabled", "disabled");
            await handler(this.getForm());
        });
    }

    createPopUpDraft = (handler: (add: { folder_name: string; form: { addressee: string; files: string; text: string; theme: string } }) => void, form: { addressee: string; files: string; theme: string; text: string }) => {
        const primBtn = new Button({
            size: 'S',
            id: 'create',
            text: 'Да',
            className: 'rightMargin'
        });

        const secBtn = new Button({
            size: 'S',
            variant: 'Secondary',
            id: 'prev',
            text: 'Нет',
        })

        const popUpNewFolder = new PopUpError({
            size: 'Auto',
            text: 'Вы не закончили писать сообщение, хотите сохранить в черновик?',
            primBtn: primBtn.render(),
            secBtn: secBtn.render(),
            id: 'popUpNewFolder',
            classNameDiv: 'sizePopUpNewFolder'
        });

        const root = document.getElementsByTagName('body')[0];
        root.insertAdjacentHTML('beforeend', popUpNewFolder.render());

        const eventDraftYes = async () => {
            await handler({
                folder_name: 'Черновики',
                form: {
                    addressee: form.addressee,
                    files: form.files,
                    text: form.text,
                    theme: form.theme,
            }});
            const popUp = document.getElementById('popUpNewFolder');
            if (popUp) {
                popUp.remove();
            }
        }
        const yesDraft = document.getElementById('create');
        if (!yesDraft) {
            return;
        }
        yesDraft.addEventListener('click', eventDraftYes);

        const eventDraftNo = () => {
            const popUp = document.getElementById('popUpNewFolder');
            if (!popUp) {
                return;
            }
            popUp.remove();
        }
        const noDraft = document.getElementById('prev');
        if (!noDraft) {
            return;
        }
        noDraft.addEventListener('click', eventDraftNo);
    }

    eventDraft = (handler: (add: { folder_name: string, form: {
            addressee: string,
            files: string,
            text: string,
            theme: string}}) => void) => {
        const docEvent: EventListenerOrEventListenerObject = async (event2) => {
            let target: HTMLElement | null = event2.target as HTMLElement;
            while (target) {
                if (target?.id === 'sendButton') {
                    document.removeEventListener('click', docEvent);
                    return;
                }

                if (target?.id === 'messageOutPut') {
                    return;
                }

                target = target.parentElement;
                if (target === null) {
                    document.removeEventListener('click', docEvent);
                    const form = this.getForm();
                    if (form.theme === this.data?.theme && form.addressee === this.data.login && form.text.replace(/(\r\n|\n|\r)/gm,"") === this.data.text.replace(/(\r\n|\n|\r)/gm,"")) {
                        return;
                    }
                    this.createPopUpDraft(handler, form);
                    return;
                }
            }
        };
        document.addEventListener('click', docEvent);
    }

    render = () => {
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
