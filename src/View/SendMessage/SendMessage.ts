import './SendMessage.scss';
import './SendMessageError.scss'
import * as sendMessageHbs from './SendMessage.hbs';
import avatar from '../image/dummy.svg';
import {Text} from '../../Ui-kit/Text/Text'
import {Input} from '../../Ui-kit/Input/Input'
import {Button} from "../../Ui-kit/Button/Button";
import {PopUpError} from "../../Ui-kit/Dilog/PopUpError";
import {router} from "../../Presenter/Router/Router";
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import addFileSvg from '../image/add.svg';
import closeSvg from '../image/close.svg';
import fileSvg from '../image/file.svg';
import './FileItem/FileItem.scss';
import * as templateFileItem from './FileItem/FileItem.hbs';
import {http} from "../../index";

export class SendMessage<T extends Element> {
    private readonly parent: T;
    private readonly data: {avatar: string, sender: string, addressee: string, theme: string, date: string, id: number, text: string} | null;
    private filesData: File[];
    private readonly flag: string;
    private isLoading: boolean;
    private counterFile: number;

    constructor(parent: T, data: {avatar: string, sender: string, addressee: string, theme: string, date: string, id: number, text: string} | null, flag?: string) {
        this.parent = parent;
        this.data = data;
        this.isLoading = false;
        this.filesData = [];
        this.counterFile = 0;
        if (flag) {
            this.flag = flag
        }
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
        avatar.src = `${http}://${window.location.hostname}/${path}`
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

    save = (handler: (folderName: string, form: {addressee: string, files: string, text: string, theme: string}, idMail: number) => void) => {
        const btnSave = document.getElementById('btnSave');
        if (!btnSave) {
            return;
        }
        const secBtn = new Button({
            size: 'S',
            variant: 'Secondary',
            id: 'saveButton',
            text: 'Сохранить',
            className: 'gapSave',
        });
        btnSave.insertAdjacentHTML('beforeend', secBtn.render());
        const saveButton = document.getElementById('saveButton');
        if (!saveButton) {
            return;
        }
        const eventUpDate = async () => {
            await handler('Черновики', this.getForm(), this.data!.id);
        }
        saveButton.addEventListener('click', eventUpDate);
    }

    send = (handler: (text: { addressee: string, files: string, text: string, theme: string }, draftId?: number) => void, handlerSendFile: (data: {attach: File, id: number}) => void, handlerGetLastId: () => number) => {
        const sendMessage = document.getElementById('sendButton');
        if (!sendMessage) {
            return;
        }

        sendMessage.addEventListener('click', async () => {
            sendMessage.setAttribute("disabled", "disabled");
            if (this.flag === 'draft' && this.data?.id !== -1) {
                await handler(this.getForm(), this.data?.id);
            } else {
                await handler(this.getForm());
            }
            if (this.filesData.length > 0) {
                this.filesData.forEach((item) => {
                    handlerSendFile({attach: item, id: handlerGetLastId()});
                })
            }
        });
    }

    createPopUpDraft = (urlNext: string) => {
        const form = this.getForm();
        if (this.data?.text === form.text && this.data.addressee === form.addressee && this.data.theme === form.theme) {
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
        });

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
        const messages = document.getElementById('messages');
        if (!messages) {
            return;
        }
        const addFile = document.getElementById('addFile');
        if (!addFile) {
            return;
        }
        const isInputTmp = document.getElementById('inputTmp');
        if (!isInputTmp) {
            const inputTmp = document.createElement('input') as HTMLInputElement;
            inputTmp.type = 'file';
            inputTmp.style.display = 'none';
            inputTmp.id = 'inputTmp'
            messages.appendChild(inputTmp);
            const eventNewFile = () => {
                if (this.isLoading) {
                    return;
                }
                this.isLoading = true;
                const input = document.getElementById('inputTmp') as HTMLInputElement;
                if (!input) {
                    return;
                }
                input.click();
                this.isLoading = false;
            }
            addFile.addEventListener('click', eventNewFile);
            this.eventInputClick();
        }
    }

    eventInputClick = () => {
        const input = document.getElementById('inputTmp') as HTMLInputElement;
        if (!input) {
            return;
        }
        input.addEventListener('change', () => {
            if (this.isLoading) {
                return;
            }
            this.isLoading = true;
            const file = input.files?.item(0);
            if (file && file.size >= 20971520) {
                this.setError('Размер вложения превышает допустимый предел в 20Мб');
                this.isLoading = false;
                return;
            }
            const files = document.getElementById('files');
            if (!files) {
                return;
            }
            const template = templateFileItem({
                fileId: this.counterFile,
                svgFile: fileSvg,
                closeSvg: closeSvg,
                text: '',
            });
            files.insertAdjacentHTML('beforeend', template);

            const text = document.getElementById(`text${this.counterFile}`) as HTMLDivElement;
            const close = document.getElementById(`close${this.counterFile}`) as HTMLImageElement;
            const all = document.getElementById(`all${this.counterFile}`) as HTMLDivElement;
            if (!file) {
                return;
            }
            this.filesData.push(file);
            text.textContent = file.name;

            close.addEventListener('click', () => {
                if (this.isLoading) {
                    return;
                }
                this.isLoading = true;
                this.filesData.filter((value, index) => {
                    if (value === file) {
                        this.filesData.splice(index, 1);
                        return;
                    }
                })
                all.remove();
                this.isLoading = false;
            });
            this.counterFile = this.counterFile + 1;
            this.isLoading = false;
        });
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
            realText: this.data !== null ? this.flag === 'draft' ? this.data.addressee : this.data.sender : '',
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
