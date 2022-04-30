import * as messageSoloHbs from './MessageSolo.hbs';
import otvet from '../image/otvet.svg';
import reMail from '../image/reMail.svg';
import {Text} from '../../ui-kit/Text/Text'
import './MessageSolo.css';
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";


export class MessageSolo<T extends Element> {
    private readonly parent: T;
    private readonly data: {avatar: any, login: string, theme: string, date: any, text: string};

    constructor(parent: T, data: {avatar: any, login: string, theme: string, date: any, text: string}) {
        this.parent = parent;
        this.data = data;
    }

    reMail() {
        const reMailElem = document.getElementById('reMail');
        if (reMailElem === null) {
            return;
        }
        reMailElem.addEventListener('click', () => {
            eventEmitter.goToSendMessage(this.data, 2);
        })
    }

    otvet() {
        const otvetElem = document.getElementById('otvet');
        if (otvetElem === null) {
            return;
        }
        otvetElem.addEventListener('click', () => {
            eventEmitter.goToSendMessage(this.data, 1);
        })
    }

    render() {
        const login = new Text({
            color: 'Black',
            size: 'L',
            text: this.data.login,
            id: 'login',
            className: 'loginIncome',
        });

        const theme = new Text({
            color: 'Black',
            size: 'XL',
            text: this.data.theme,
            id: 'theme',
            className: 'bolt',
        });

        const dat = new Date(this.data.date);

        const time = new Text({
            color: 'Black',
            size: 'L',
            text: (('0' + dat.getDate()).slice(-2) + ':' + ('0' + (dat.getMonth() + 1)).slice(-2)),
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
            avatar: `http://${window.location.hostname}:8080/${this.data.avatar}`,
            login: login.render(),
            time: time.render(),
            text: text.render(),
            otvet: otvet,
            reText: reMail,
        })

        this.parent.insertAdjacentHTML('beforeend', template);
    }
}
