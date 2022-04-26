import * as messageSoloHbs from './MessagePage.hbs';
import otvet from '../image/otvet.svg';
import reMail from '../image/reMail.svg';
import {Text} from '../../ui-kit/Text/Text'
import './MessagePage.scss';
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";


export class MessagePage<T extends Element> {
    private readonly parent: T;
    private readonly data: {avatar: any, login: string, theme: string, date: any, text: string, id: number};

    constructor(parent: T, data: {avatar: any, login: string, theme: string, date: any, text: string, id: number}) {
        this.parent = parent;
        this.data = data;
    }

    reMail() {
        const reMailElem = document.getElementById('reMail');
        if (reMailElem === null) {
            return;
        }
        reMailElem.addEventListener('click', () => {
            eventEmitter.goToSendMessage(this.data, 'reSend');
        })
    }

    forward() {
        const forwardElem = document.getElementById('forward');
        if (forwardElem === null) {
            return;
        }
        forwardElem.addEventListener('click', () => {
            eventEmitter.goToSendMessage(this.data, 'forward');
        });
    }

    render() {
        const login = new Text({
            color: 'Black',
            size: 'L',
            text: `От: ${this.data.login}`,
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
            text: this.data.date,
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
        })

        this.parent.insertAdjacentHTML('beforeend', template);
    }
}
