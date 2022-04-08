import {SignInRender} from '../../Presenter/pages/SignIn/SignIn';
import {Ajax} from '../../Model/Network/Ajax';
import './Message.css';
import avatarSvg from '../image/avatar.svg';
import {Text} from "../../ui-kit/Text/Text";
import * as messageItem from './MessageItem/MessageItem.hbs';
import * as mainMessage from './Message.hbs';
import './MessageItem/MessageItem.css'

export class Message<T extends Element> {
    private readonly parent: T;
    private readonly data: any;

    constructor(parent: T, data: any) {
        this.parent = parent;
        this.data = data;
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

        const itemsMassage = [{}];
        this.data.forEach((pars: any) => {
            const date = new Date(pars.date);
            itemsMassage.push({
                avatar: avatarSvg,
                title: pars.theme,
                subTitle: pars.text,
                time: (('0' + date.getDate()).slice(-2) + ':' + ('0' + (date.getMonth() + 1)).slice(-2)),
            });
        });

        const messageText = this.renderMassage(itemsMassage);
        const render = mainMessage({
            items: messageText,
        });

        this.parent.insertAdjacentHTML('beforeend', render);
    }

    renderMassage(itemsMassage: any) {
        const messageText: { avatar: string; title: string; subTitle: string; time: string; }[] = [];
        itemsMassage.forEach((item: { avatar: string; title: string; subTitle: string; time: string; }, index: number) => {
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
                className: 'messageTextSub'
            });
            let flag: number = 1;

            if (itemsMassage.length === index) {
                flag = 0;
            }
            messageText.push(messageItem({
                avatar: item.avatar,
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
