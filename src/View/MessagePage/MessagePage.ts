import * as messageSoloHbs from './MessagePage.hbs';
import otvet from '../image/otvet.svg';
import reMail from '../image/reMail.svg';
import {Text} from '../../Ui-kit/Text/Text'
import './MessagePage.scss';
import settings from '../image/settings.svg'
import {router} from "../../Presenter/Router/Router";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";
import {PopUp} from "../../Ui-kit/PopUp/PopUp";
import {calcPositionXY} from "../../Utils/CalcPositionXY/CalcPositionXY";
import spamSVG from "../image/spam.svg";
import plusSVG from "../image/plus.svg";
import rmSVG from "../image/remove.svg";
import inputSVG from "../image/input.svg";
import folderSVG from "../image/directories.svg";
import {calcSecondPositionXY} from "../../Utils/CalcPositionXY/CalcSecondPositionXY";


export class MessagePage<T extends Element> {
    private readonly parent: T;
    private readonly data: {
        avatar: string,
        addressee: string;
        date: Date;
        files: string;
        id: number;
        read: boolean;
        sender: string;
        text: string;
        theme: string,
        realDate: string
    };
    private readonly popUp;
    private isLoading: boolean;

    constructor(parent: T, data: { avatar: string, addressee: string; date: Date; files: string; id: number; read: boolean; sender: string; text: string; theme: string, realDate: string }) {
        this.parent = parent;
        this.data = data;
        this.isLoading = false;
        this.popUp = {
            id: 'popUp',
            classNameDiv: 'positionPopUp',
            content: [
                {
                    id: 'spam',
                    icon: spamSVG,
                    text: 'Добавить в спам',
                },
                {
                    id: 'folder',
                    icon: plusSVG,
                    type: 'folders',
                    text: 'Добавить в папку',
                },
                {
                    id: 'remove',
                    icon: rmSVG,
                    text: 'Удалить',
                },
            ],
        }
    }

    reMail = () => {
        const reMailElem = document.getElementById('reMail');
        if (reMailElem === null) {
            return;
        }
        reMailElem.addEventListener('click', () => {
            router.redirect(urlsRouter.send, 'reSend', {dataSendMessage: {...this.data, flag: 'reSend'}});
        })
    }

    forward = () => {
        const forwardElem = document.getElementById('forward');
        if (forwardElem === null) {
            return;
        }
        forwardElem.addEventListener('click', () => {
            router.redirect(urlsRouter.send, 'forward', {dataSendMessage: {...this.data, flag: 'forward'}});
        });
    }

    eventSettings = (handlers: { handlerGetFolders: () => any, handlerGoToIncome: (folder_name: string, mail_id: number) => void, handlerRm: (name: number) => void, handlerSpam: (foldr_id: string, mail_id: number) => void, handlerAddInFolder: (foldr_id: string, mail_id: number) => void, handlerGetFoldersMove: (folder_name_dest: string, folder_name_src: string, mail_id: number) => void }, folderName: string) => {
        const getElem = document.getElementById(`settings`);
        if (getElem === null) {
            return;
        }
        getElem.addEventListener('click', (event) => {
            event.preventDefault();
            const popUpPrev = document.getElementById('popUp');
            if (popUpPrev) {
                popUpPrev.remove();
                const popUpFolders = document.getElementById('popUpFolders');
                if (popUpFolders) {
                    popUpFolders.remove();
                }
                return;
            }
            const popUp = new PopUp(this.popUp);
            const root = document.getElementById('messages');
            root?.insertAdjacentHTML('beforeend', popUp.render());
            const popUpReal = document.getElementById('popUp') as HTMLDivElement;
            if (!popUpReal) {
                return;
            }

            const docEvent: EventListenerOrEventListenerObject = async (event2) => {
                let target: HTMLElement | null = event2.target as HTMLElement;
                while (target) {
                    if (target?.id === 'settings') {
                        return;
                    }

                    if (target?.id === 'popUpFolders') {
                        return;
                    }

                    if (target?.id === 'spam') {
                        if (this.isLoading) {
                            return;
                        }
                        this.isLoading = true;
                        document.removeEventListener('click', docEvent);
                        if (folderName) {
                            await handlers.handlerGetFoldersMove('Спам', folderName, this.data.id);
                        } else {
                            await handlers.handlerSpam('Спам', this.data.id);
                        }
                        router.redirect(urlsRouter.income);
                        this.isLoading = false;
                        return;
                    }

                    if (target?.id === 'folder') {
                        if (this.isLoading) {
                            return;
                        }
                        this.isLoading = true;
                        const isFoldersDiv = document.getElementById('popUpFolders');
                        if (isFoldersDiv) {
                            return;
                        }
                        const folders = await handlers.handlerGetFolders();
                        this.createFolders(folders, handlers.handlerGetFoldersMove, handlers.handlerGoToIncome, handlers.handlerAddInFolder, getElem, this.data.id, folderName);
                        this.isLoading = false;
                        return;
                    }

                    if (target?.id === 'remove') {
                        if (this.isLoading) {
                            return;
                        }
                        this.isLoading = true;
                        document.removeEventListener('click', docEvent);
                        await handlers.handlerRm(this.data.id);
                        router.redirect(urlsRouter.income);
                        this.isLoading = false;
                        return;
                    }

                    target = target.parentElement;
                    if (target === null) {
                        const foldersDiv = document.getElementById('popUpFolders');
                        if (foldersDiv) {
                            foldersDiv.remove();
                        }
                        document.removeEventListener('click', docEvent);
                        popUpReal.remove();
                        return;
                    }
                }
            };
            document.addEventListener('click', docEvent);
        });
    }

    createFolders = async (folders: { id: number; name: string; userId: number; date: string }[], handlerGetFoldersMove: (folder_name_dest: string, folder_name_src: string, mail_id: number) => void, handlerGoToIncome: (foldr_id: string, mail_id: number) => void, handlerAddInFolder: (foldr_id: string, mail_id: number) => void, getElem: HTMLElement, id: number, folderName: string) => {
        const foldersName: { id: string, text: string, icon: string }[] = [];

        if (folderName) {
            foldersName.push({id: 'incomePopUp', icon: inputSVG, text: 'Входящие'});
        }

        folders.forEach((item) => {
            foldersName.push({id: item.id.toString() + 'popUp', icon: folderSVG, text: item.name});
        });

        const popUpFolders = new PopUp({
            id: 'popUpFolders',
            classNameDiv: 'classPopUpFolders',
            content: foldersName
        });
        const root = document.getElementById('messages');
        root?.insertAdjacentHTML('beforeend', popUpFolders.render());

        const foldersDiv = document.getElementById('popUpFolders');
        if (!foldersDiv) {
            return;
        }
        const popUpReal = document.getElementById('popUp') as HTMLDivElement;
        if (!popUpReal) {
            return;
        }

        if (folderName) {
            const eventClickIncome = async () => {
                await handlerGoToIncome(folderName, id);
                router.redirect(`/folder/${folderName}`);
            }
            const income = document.getElementById('incomePopUp');
            if (!income)
                return;
            income.addEventListener('click', eventClickIncome);
        }

        folders.forEach((item) => {
            const eventFolderClick = async () => {
                if (folderName) {
                    await handlerGetFoldersMove(item.name, folderName, id);
                    router.redirect(`/folder/${folderName}`);
                } else {
                    await handlerAddInFolder(item.name, id);
                    router.redirect(urlsRouter.income);
                }
                getElem.remove();
            }
            const elem = document.getElementById(item.id.toString() + 'popUp');
            if (!elem)
                return;
            elem.addEventListener('click', eventFolderClick);
        });
    }

    render = () => {
        const login = new Text({
            color: 'Black',
            size: 'L',
            text: `От: ${this.data.sender}`,
            id: 'login',
            className: 'loginIncome',
        });

        const theme = new Text({
            color: 'Black',
            size: 'XL',
            text: `Тема: ${this.data.theme}`,
            id: 'theme',
            className: 'bolt',
        });

        const time = new Text({
            color: 'Black',
            size: 'L',
            text: this.data.realDate,
            id: 'date',
            className: 'timeIncome',
        });

        const text = new Text({
            color: 'Black',
            size: 'L',
            text: this.data.text,
            id: 'text',
            className: 'listEmailText',
        });

        const template = messageSoloHbs({
            theme: theme.render(),
            avatar: this.data.avatar,
            login: login.render(),
            time: time.render(),
            text: text.render(),
            otvet: otvet,
            reText: reMail,
            settings: settings,
        })

        this.parent.insertAdjacentHTML('beforeend', template);
    }
}
