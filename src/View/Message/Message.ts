import './Message.scss';
import dotSVG from '../image/dot.svg';
import spamSVG from '../image/spam.svg';
import plusSVG from '../image/plus.svg';
import rmSVG from '../image/remove.svg';
import folderSVG from '../image/directories.svg'
import {Text} from "../../ui-kit/Text/Text";
import * as messageItem from './MessageItem/MessageItem.hbs';
import * as mainMessage from './Message.hbs';
import './MessageItem/MessageItem.scss';
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {PopUp} from "../../ui-kit/PopUp/PopUp";
import {calcPositionXY} from "../../Utils/CalcPositionXY/CalcPositionXY";
import {calcSecondPositionXY} from "../../Utils/CalcPositionXY/CalcSecondPositionXY";

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
    private readonly type: number;
    private readonly popUpMessage;
    private xPos: number;
    private yPos: number;

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
    }[], type: number) {
        this.parent = parent;
        this.messages = data;
        this.type = type;
        this.xPos = 0;
        this.yPos = 0;
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

    eventRightClickMessage = () => {
        this.messages.forEach((list) => {
            const getElem = document.getElementById(list.id.toString());
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
                console.log(event.clientX, event.clientY)
                popUpReal.style.top = this.yPos.toString() + 'px';
                popUpReal.style.left = this.xPos.toString() + 'px';

                const docEvent: EventListenerOrEventListenerObject = (event2) => {
                    let target: HTMLElement | null = event2.target as HTMLElement;
                    while (target) {
                        if (target?.id === 'spam') {
                            document.removeEventListener('click', docEvent);
                            // toDo spam
                            return;
                        }

                        if (target?.id === 'folder') {
                            const isFoldersDiv = document.getElementById('popUpFolders');
                            if (isFoldersDiv) {
                                console.log('skip');
                                return;
                            }
                            this.createFolders();
                            // toDo folder
                            return;
                        }

                        if (target?.id === 'remove') {
                            document.removeEventListener('click', docEvent);
                            popUpReal.remove();
                            // toDo remove
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

    createFolders = () => {
        //handler();
        //mock
        const foldersName: {id: string, text: string, icon: string}[] = [{id: '123', text: '123', icon: folderSVG}, {id: '1234', text: '1234', icon: folderSVG},{id: '1234', text: '1234', icon: folderSVG},{id: '1234', text: '1234', icon: folderSVG},{id: '1234', text: '1234', icon: folderSVG},{id: '1234', text: '1234', icon: folderSVG},{id: '1234', text: '1234', icon: folderSVG}];

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
    }

    goToMessagePage = () => {
        this.messages.forEach((list) => {
            const getElem = document.getElementById(list.id.toString());
            if (getElem === null) {
                return;
            }
            getElem.addEventListener('click', () => {
                eventEmitter.goToMessagePage({
                    avatar: list.avatar,
                    id: list.id,
                    login: list.sender,
                    theme: list.title,
                    date: list.timeReal,
                    text: list.subTitle,
                });
            });
        });
    }

    render = () => {
        if (this.messages === null) {
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

        const messageText = this.renderMassage(this.messages);
        const render = mainMessage({
            items: messageText,
        });

        this.parent.insertAdjacentHTML('beforeend', render);
    }

    renderMassage = (itemsMassage: { id: number, client_id: number, sender: string, title: string, subTitle: string, files: string, time: string, read: boolean, avatar: string }[]) => {
        const messageText: { avatar: string; id: number; title: string; subTitle: string; time: string; read: boolean, sender: string }[] = [];
        itemsMassage.forEach((item: { avatar: string; id: number; title: string; subTitle: string; time: string; read: boolean, sender: string }, index: number) => {
            if (this.type === 2) {
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

            if (itemsMassage.length === index + 1) {
                flag = 0;
            }
            messageText.push(messageItem({
                id: item.id,
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
