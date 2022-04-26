import './Message.scss';
import dotSVG from '../image/dot.svg'
import {Text} from "../../ui-kit/Text/Text";
import * as messageItem from './MessageItem/MessageItem.hbs';
import * as mainMessage from './Message.hbs';
import './MessageItem/MessageItem.scss'
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";

export class Message<T extends Element> {
    private readonly parent: T;
    private readonly messages:
        {
            id: number,
            client_id: number,
            sender: string,
            title: string,
            subTitle: string,
            files: string,
            time: any,
            read: boolean,
            avatar: string,
            timeReal: string,
        }[];
    private readonly type: any;

    constructor(parent: T, data: any, type: number) {
        this.parent = parent;
        this.messages = data;
        this.type = type;
    }

    goToMessagePage() {
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
        })
    }

    render() {
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

    renderMassage(itemsMassage: { id: number, client_id: number, sender: string, title: string, subTitle: string, files: string, time: any, read: boolean, avatar: string }[]) {
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
            let flag: number = 1;

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
