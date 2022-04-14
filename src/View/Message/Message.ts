import './Message.css';
import avatarSvg from '../image/avatar.svg';
import {Text} from "../../ui-kit/Text/Text";
import * as messageItem from './MessageItem/MessageItem.hbs';
import * as mainMessage from './Message.hbs';
import './MessageItem/MessageItem.css'
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";

export class Message<T extends Element> {
    private readonly parent: T;
    private readonly data: any;

    constructor(parent: T, data: any) {
        this.parent = parent;
        this.data = data;
    }

    goToSoloList(){
        this.data.forEach((list: any) => {
            const getElem = document.getElementById(list['mail']['id']);
            if (getElem === null) {
                return;
            }
            getElem.addEventListener('click', () => {
                eventEmitter.goToSoloMessage({
                    avatar: list['sender_avatar'],
                    id: list['mail']['id'],
                    login: list['mail']['sender'],
                    theme: list['mail']['theme'],
                    date: list['mail']['date'],
                    text: list['mail']['text'],
                });
            });
        })
    }

    render() {
        if (this.data === null) {
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

        const itemsMassage: {avatar: string, id: number, title: string, subTitle: string, time: string, read: boolean}[] = [];
        this.data.forEach((pars: any) => {
            const date = new Date(pars['mail']['date']);
            itemsMassage.push({
                avatar: `http://${window.location.hostname}:8080/${pars['sender_avatar']}`,
                read: pars['mail']['read'],
                id: pars['mail']['id'],
                title: pars['mail']['theme'],
                subTitle: pars['mail']['text'],
                time: (('0' + date.getDate()).slice(-2) + ':' + ('0' + (date.getMonth() + 1)).slice(-2)),
            });
        });

        const messageText = this.renderMassage(itemsMassage);
        const render = mainMessage({
            items: messageText,
        });

        this.parent.insertAdjacentHTML('beforeend', render);
    }

    renderMassage(itemsMassage: {avatar: string, id: number, title: string, subTitle: string, time: string, read: boolean}[]) {
        const messageText: { avatar: string; id: number; title: string; subTitle: string; time: string; read: boolean}[] = [];
        itemsMassage.forEach((item: { avatar: string; id: number; title: string; subTitle: string; time: string; read: boolean}, index: number) => {
            const titleText = new Text({
                text: item.title,
                size: 'L',
                className: 'messageTextText'
            });

            const subText = new Text({
                text: item.subTitle,
                size: 'L',
                color: 'Grey',
                className: 'messageTextSub'
            });

            const emptyText = new Text({
                text: '',
                size: 'L',
                className: 'messageTextBlock'
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
                titleText: titleText.render(),
                subText: subText.render(),
                emptyText: emptyText.render(),
                timeText: timeText.render(),
                flag: flag,
                empty: 0,
            }));
        });
        return messageText;
    }
}
