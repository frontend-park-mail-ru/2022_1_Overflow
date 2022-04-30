import {Header} from '../../../View/Header/Header';
import {Menu} from '../../../View/Menu/Menu';
import {Message} from '../../../View/Message/Message';
import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {Ajax} from "../../../Model/Network/Ajax";
import {HeaderModel} from "../../../Model/HeaderModel/HeaderModel";
import {MessageModel} from "../../../Model/MessageModel/MessageModel";
import {SendMessage} from "../../../View/SendMessage/SendMessage";
import {SendMessageModel} from "../../../Model/SendMessageModel/SendMessageModel";

export class SendMessagePresenter {
    private readonly parent: Element;
    private headerView: Header<Element>;
    private menuView: Menu<Element>;
    private headerModel: HeaderModel;
    private sendMessageModel: SendMessageModel;
    private sendMessageView: SendMessage<Element>;
    private data: { avatar: any, login: string, theme: string, date: any, text: string } | null;
    private flag: number;

    constructor(parent: Element) {
        this.parent = parent;
        this.data = null;
    }

    set context(data: { avatar: any, login: string, theme: string, date: any, text: string, flag: number } | null) {
        if (data !== null) {
            this.data = {avatar: data.avatar, login: data.login, theme: data.theme, date: data.date, text: data.text};
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
        this.headerView.evenPopUpExit(this.headerModel.logout);

        this.menuView = new Menu(this.parent);
        this.menuView.render();
        const main = document.getElementById('main');
        if (main === null)
            return

        this.sendMessageModel = new SendMessageModel();
        if (this.data !== null) {
            if (this.flag === 1) {
                this.sendMessageModel.clean(this.data);
            }
            if (this.flag === 2){
                this.sendMessageModel.cleanRe(this.data)
            }
        }
        this.sendMessageView = new SendMessage(main, this.data);
        this.sendMessageView.render();
        this.sendMessageView.send(this.sendMessageModel.checkInput);
    };
}