import './Message.scss';
import dotSVG from '../image/dot.svg';
import spamSVG from '../image/spam.svg';
import inputSVG from '../image/input.svg';
import plusSVG from '../image/plus.svg';
import rmSVG from '../image/remove.svg';
import folderSVG from '../image/directories.svg'
import {Text} from "../../Ui-kit/Text/Text";
import * as messageItem from './MessageItem/MessageItem.hbs';
import * as mainMessage from './Message.hbs';
import './MessageItem/MessageItem.scss';
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {PopUp} from "../../Ui-kit/PopUp/PopUp";
import {calcPositionXY} from "../../Utils/CalcPositionXY/CalcPositionXY";
import {calcSecondPositionXY} from "../../Utils/CalcPositionXY/CalcSecondPositionXY";
import {router} from "../../Presenter/Router/Router";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";

export class Message<T extends Element> {
    private readonly parent: T;
    private readonly messages: {
        id: number;
        client_id: number;
        sender: string;
        title: string;
        subTitle: string;
        files: string;
        time: string;
        read: boolean;
        avatar: string;
        timeReal: string
    }[];
    private readonly type: string;
    private readonly folderName: string;
    private readonly popUpMessage;
    private xPos: number;
    private yPos: number;
    private isLoading: boolean;

    constructor(parent: T, data: {
        id: number,
        client_id: number,
        sender: string,
        title: string,
        subTitle: string,
        files: string,
        time: string,
        read: boolean,
        avatar: string,
        timeReal: string,
    }[], type: string, folderName: string) {
        this.folderName = folderName;
        this.parent = parent;
        this.messages = data;
        this.type = type;
        this.xPos = 0;
        this.yPos = 0;
        this.isLoading = false;
        this.popUpMessage = {
            id: 'popUpMessage',
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

    eventRightClickMessage = (handlers: {handlerGetFolders: () => any, handlerGoToIncome: (folder_name: string, mail_id: number) => void, handlerRm: (name: number) => void, handlerSpam: (foldr_id: string, mail_id: number) => void, handlerAddInFolder: (foldr_id: string, mail_id: number) => void, handlerGetFoldersMove: (folder_name_dest: string, folder_name_src: string, mail_id: number) => void}, folderName: string) => {
        if (!this.messages) {
            return;
        }
        this.messages.forEach((list) => {
            const getElem = document.getElementById(`message${list.id.toString()}`);
            if (getElem === null) {
                return;
            }
            getElem.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                const popUpPrev = document.getElementById('popUpMessage');
                if (popUpPrev) {
                    popUpPrev.remove();
                }

                const popUpFolders = document.getElementById('popUpFolders');
                if (popUpFolders) {
                    popUpFolders.remove();
                }

                const popUp = new PopUp(this.popUpMessage);
                const root = document.getElementsByTagName('body')[0];
                root.insertAdjacentHTML('beforeend', popUp.render());
                const popUpReal = document.getElementById('popUpMessage') as HTMLDivElement;
                if (!popUpReal) {
                    return;
                }

                const {x, y} = calcPositionXY(event.clientX, event.clientY, popUpReal);
                this.xPos = x;
                this.yPos = y;
                popUpReal.style.top = this.yPos.toString() + 'px';
                popUpReal.style.left = this.xPos.toString() + 'px';

                const docEvent: EventListenerOrEventListenerObject = async (event2) => {
                    let target: HTMLElement | null = event2.target as HTMLElement;
                    while (target) {
                        if (target?.id === 'spam') {
                            if (this.isLoading) {
                                return;
                            }
                            this.isLoading = true;
                            popUpReal.remove();
                            const isFoldersDiv = document.getElementById('popUpFolders');
                            if (isFoldersDiv) {
                                isFoldersDiv.remove();
                            }
                            document.removeEventListener('click', docEvent);
                            if (getElem.nextElementSibling) {
                                getElem.nextElementSibling.remove();
                            } else {
                                if (getElem.previousElementSibling) {
                                    getElem.previousElementSibling.remove();
                                }
                            }
                            getElem.remove();
                            if (folderName) {
                                await handlers.handlerGetFoldersMove('Спам', folderName, list.id);
                            } else {
                                await handlers.handlerSpam('Спам', list.id);
                            }
                            await handlers.handlerSpam('Спам', list.id);
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
                            this.createFolders(folders, handlers.handlerGetFoldersMove, handlers.handlerGoToIncome, handlers.handlerAddInFolder, getElem, list, folderName);
                            this.isLoading = false;
                            return;
                        }

                        if (target?.id === 'remove') {
                            if (this.isLoading) {
                                return;
                            }
                            this.isLoading = true;
                            document.removeEventListener('click', docEvent);
                            popUpReal.remove();
                            if (getElem.nextElementSibling) {
                                getElem.nextElementSibling.remove();
                            } else {
                                if (getElem.previousElementSibling) {
                                    getElem.previousElementSibling.remove();
                                }
                            }
                            getElem.remove();
                            await handlers.handlerRm(list.id);
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
        });
    }

    createFolders = async (folders: { id: number; name: string; userId: number; date: string }[], handlerGetFoldersMove: (folder_name_dest: string, folder_name_src: string, mail_id: number) => void, handlerGoToIncome: (foldr_id: string, mail_id: number) => void, handlerAddInFolder: (foldr_id: string, mail_id: number) => void, getElem: HTMLElement, list: { id: number; client_id: number; sender: string; title: string; subTitle: string; files: string; time: string; read: boolean; avatar: string; timeReal: string }, folderName: string) => {
        const foldersName: { id: string, text: string, icon: string }[] = [];

        if (folderName) {
            foldersName.push({id: 'incomePopUp', icon: inputSVG, text: 'Входящие'});
        }

        folders.forEach((item) => {
            foldersName.push({id: item.id.toString() + 'popUp', icon: folderSVG, text: item.name});
        })

        const popUpFolders = new PopUp({
            id: 'popUpFolders',
            content: foldersName
        });
        const root = document.getElementsByTagName('body')[0];
        root.insertAdjacentHTML('beforeend', popUpFolders.render());

        const foldersDiv = document.getElementById('popUpFolders');
        if (!foldersDiv) {
            return;
        }
        const popUpReal = document.getElementById('popUpMessage') as HTMLDivElement;
        if (!popUpReal) {
            return;
        }
        const {x, y} = calcSecondPositionXY(this.xPos, this.yPos, popUpReal, foldersDiv);
        foldersDiv.style.top = y.toString() + 'px';
        foldersDiv.style.left = x.toString() + 'px';

        if (folderName) {
            const eventClickIncome = () => {
                if (getElem.nextElementSibling) {
                    getElem.nextElementSibling.remove();
                } else {
                    if (getElem.previousElementSibling) {
                        getElem.previousElementSibling.remove();
                    }
                }
                handlerGoToIncome(folderName, list.id);
                getElem.remove();
            }
            const income = document.getElementById('incomePopUp');
            if (!income)
                return;
            income.addEventListener('click', eventClickIncome);
        }

        folders.forEach((item) => {
            const eventFolderClick = () => {
                if (getElem.nextElementSibling) {
                    getElem.nextElementSibling.remove();
                } else {
                    if (getElem.previousElementSibling) {
                        getElem.previousElementSibling.remove();
                    }
                }
                if (folderName) {
                    handlerGetFoldersMove(item.name, folderName, list.id);
                } else {
                    handlerAddInFolder(item.name, list.id);
                }
                getElem.remove();
            }

            const elem = document.getElementById(item.id.toString() + 'popUp');
            if (!elem)
                return;
            elem.addEventListener('click', eventFolderClick);
        });
    }

    goToMessageEdit = () => {
        if (!this.messages) {
            return;
        }
        this.messages.forEach((list) => {
            const getElem = document.getElementById(`message${list.id.toString()}`);
            if (getElem === null) {
                return;
            }
            getElem.addEventListener('click', () => {
                router.redirect(urlsRouter.send, 'dif', {dataSendMessage: {avatar: list.avatar, sender: list.sender, addressee: list.sender, theme: list.title, date: list.time, text: list.subTitle, id: list.id, flag: 'draft'}})
            });
        });
    }

    renderEmpty = () => {
        const emptyText = new Text({
            color: 'Grey',
            text: 'Список писем пуст',
            size: 'L',
            className: 'messageEmpty'
        });
        const emptyTextText = [messageItem({
            emptyTextText: emptyText.render(),
            empty: 1,
            flag: 0,
        })];
        const renderEmpty = mainMessage({
            items: emptyTextText,
        })
        this.parent.insertAdjacentHTML('beforeend', renderEmpty);
        return;
    }

    render = () => {
        if (this.messages === null) {
            this.renderEmpty();
            return;
        }

        const messageText = this.renderMassage(this.messages);
        const render = mainMessage({
            items: messageText,
        });

        this.parent.insertAdjacentHTML('beforeend', render);
    }

    renderMassage = (itemsMassage: { id: number, client_id: number, sender: string, title: string, subTitle: string, files: string, time: string, read: boolean, avatar: string }[]) => {
        const messageText: { avatar: string; id: number; title: string; subTitle: string; time: string; read: boolean, sender: string }[] = [];
        itemsMassage.forEach((item: { avatar: string; id: number; title: string; subTitle: string; time: string; read: boolean, sender: string }, index: number) => {
            if (this.type === 'outcome' || this.type === 'draft') {
                item.read = true;
            }

            const senderText = (item.read) ? new Text({
                    text: item.sender,
                    size: 'L',
                    className: 'widthName',
                }) :
                new Text({
                    text: item.sender,
                    size: 'L',
                    className: 'bold widthName',
                });

            const titleText = (item.read) ? new Text({
                    text: item.title,
                    size: 'L',
                    className: 'messageTextText'
                }) :
                new Text({
                    text: item.title,
                    size: 'L',
                    className: 'messageTextText bold'
                });

            const subText = new Text({
                text: item.subTitle,
                size: 'L',
                color: 'Grey',
                className: 'messageTextSub'
            });

            const timeText = new Text({
                text: item.time,
                size: 'L',
                className: 'messageTextTime'
            });
            let flag = 1;

            if (index === 0) {
                flag = 0;
            }
            messageText.push(messageItem({
                id: `message${item.id}`,
                href: (this.type === 'draft') ? '' : `${this.type}/${(this.folderName) ? this.folderName + '/' : ''}${item.id}`,
                avatar: item.avatar,
                read: !item.read,
                dot: dotSVG,
                name: senderText.render(),
                titleText: titleText.render(),
                subText: subText.render(),
                timeText: timeText.render(),
                flag: flag,
                empty: 0,
            }));
        });
        return messageText;
    }
}
