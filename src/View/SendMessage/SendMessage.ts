import './SendMessage.scss';
import './SendMessageError.scss'
import * as sendMessageHbs from './SendMessage.hbs';
import avatar from '../image/dummy.svg';
import {Text} from '../../Ui-kit/Text/Text'
import {Input} from '../../Ui-kit/Input/Input'
import {Button} from "../../Ui-kit/Button/Button";
import {PopUpError} from "../../Ui-kit/PopUpError/PopUpError";
import {router} from "../../Presenter/Router/Router";
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import addFileSvg from '../image/add.svg';
import closeSvg from '../image/close.svg';
import './FileItem/FileItem.scss';
import * as templateFileItem from './FileItem/FileItem.hbs';

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

    createPopUpDraft = (urlNext: string) => {
        const form = this.getForm();
        if (this.data?.text === form.text && this.data.login === form.addressee && this.data.theme === form.theme) {
            router.redirect(urlNext);
            return;
        }
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
            classNameDiv: 'sizePopUpNewFolder',
        });

        const root = document.getElementsByTagName('body')[0];
        root.insertAdjacentHTML('beforeend', popUpNewFolder.render());

        const eventDraftYes = async () => {
            await eventEmitter.emit('fetchDraft', { folder_name: 'Черновики', form: this.getForm()});
            const popUpElem = document.getElementById('popUpNewFolder');
            popUpElem?.remove();
            router.redirect(urlNext);
        }
        const yesDraft = document.getElementById('create');
        if (!yesDraft) {
            return;
        }
        yesDraft.addEventListener('click', eventDraftYes);

        const eventDraftNo = () => {
            const popUpElem = document.getElementById('popUpNewFolder');
            popUpElem?.remove();
            router.redirect(urlNext);
        }
        const noDraft = document.getElementById('prev');
        if (!noDraft) {
            return;
        }
        noDraft.addEventListener('click', eventDraftNo);
    }

    eventAddNewFile = () => {
        const addFile = document.getElementById('addFile');
        if (!addFile) {
            return;
        }
        const eventNewFile = () => {
            const files = document.getElementById('files');
            if (!files) {
                return;
            }
            const template = templateFileItem({
                fileId: 1,
                svgFile: addFileSvg,
                closeId: 1,
                closeSvg: closeSvg,
                text: '123.jpg',
                inputId: 1,
            })
            files.insertAdjacentHTML('beforeend', template);
        }
        addFile.addEventListener('click', eventNewFile);
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
            addFile: addFileSvg,
            closeSvg: closeSvg,
            login: inputLogin.render(),
            theme: theme.render(),
            themeInput: themeInput.render(),
            text: this.data !== null ? this.data.text : '',
            send: send.render(),
        });

        this.parent.insertAdjacentHTML('beforeend', template);

        const cursorSet = document.getElementById('textareaMain');
        if (!cursorSet) {
            return;
        }
        cursorSet.focus();
    }
}
