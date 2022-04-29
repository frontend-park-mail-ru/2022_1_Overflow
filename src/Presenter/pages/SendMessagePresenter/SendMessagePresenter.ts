import {Header} from '../../../View/Header/Header';
import {Menu} from '../../../View/Menu/Menu';
import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {HeaderModel} from "../../../Model/HeaderModel/HeaderModel";
import {SendMessage} from "../../../View/SendMessage/SendMessage";
import {SendMessageModel} from "../../../Model/SendMessageModel/SendMessageModel";

export class SendMessagePresenter {
    private readonly parent: Element;
    private headerView: Header<Element>;
    private menuView: Menu<Element>;
    private headerModel: HeaderModel;
    private sendMessageModel: SendMessageModel;
    private sendMessageView: SendMessage<Element>;
    private data: { avatar: any, login: string, theme: string, date: any, id: number, text: string };
    private flag: string;

    constructor(parent: Element) {
        this.parent = parent;
        this.flag = 'default';
        this.data = { avatar: '', login: '', theme: '', date: '', text: '', id: -1 };
    }

    set context(data: { avatar: any, login: string, theme: string, date: any, text: string, id: number, flag: string }) {
        if (data !== null) {
            this.data = {avatar: data.avatar, login: data.login, theme: data.theme, date: data.date, id: data.id, text: data.text};
            this.flag = data.flag;
        }
    }

    render = async () => {
        eventEmitter.cleanEvents();
        this.parent.innerHTML = '';
        this.headerModel = new HeaderModel();
        await this.headerModel.getProfile();
        await this.headerModel.getAvatar();
        this.headerView = new Header(this.parent, this.headerModel.outputData());
        this.headerView.render();
        this.headerView.evenPopUp(this.headerModel.logout);

        this.menuView = new Menu(this.parent);
        this.menuView.render();
        const main = document.getElementById('main');
        if (main === null)
            return

        this.sendMessageModel = new SendMessageModel();
        await this.sendMessageModel.fetchGetProfile();
        this.sendMessageView = new SendMessage(main, this.data);

        eventEmitter.on('error', this.sendMessageView.setError);
        eventEmitter.on('errorTheme', this.sendMessageView.setErrorTheme);
        eventEmitter.on('setAvatar', this.sendMessageView.setAvatar);

        if (this.flag === 'default') {
            if (this.data !== null) {
                this.sendMessageModel.cleanDefault(this.data);
            }
        }

        if (this.flag === 'reSend') {
            if (this.data !== null) {
                this.sendMessageModel.cleanRe(this.data);
            }
        }

        if (this.flag === 'forward') {
            if (this.data !== null) {
                this.sendMessageModel.cleanLogin(this.data);
            }
        }
        this.sendMessageView.render();

        if (this.flag === 'reSend') {
            await this.sendMessageModel.fetchGetUserAvatar(this.data.login);
        }

        this.sendMessageView.send(this.sendMessageModel.checkInput);
        this.sendMessageView.eventsLoginChange(this.sendMessageModel.fetchGetUserAvatar)
    };
}