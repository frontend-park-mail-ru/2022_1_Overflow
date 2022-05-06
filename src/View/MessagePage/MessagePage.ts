import * as messageSoloHbs from './MessagePage.hbs';
import otvet from '../image/otvet.svg';
import reMail from '../image/reMail.svg';
import {Text} from '../../Ui-kit/Text/Text'
import './MessagePage.scss';
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";


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

    constructor(parent: T, data: {avatar: string, addressee: string; date: Date; files: string; id: number; read: boolean; sender: string; text: string; theme: string, realDate: string}) {
        this.parent = parent;
        this.data = data;
    }

    reMail = () => {
        const reMailElem = document.getElementById('reMail');
        if (reMailElem === null) {
            return;
        }
        reMailElem.addEventListener('click', () => {
            eventEmitter.goToSendMessage(this.data, 'reSend');
        })
    }

    forward = () => {
        const forwardElem = document.getElementById('forward');
        if (forwardElem === null) {
            return;
        }
        forwardElem.addEventListener('click', () => {
            eventEmitter.goToSendMessage(this.data, 'forward');
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
        })

        this.parent.insertAdjacentHTML('beforeend', template);
    }
}
