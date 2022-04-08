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

    constructor(parent: Element) {
        this.parent = parent;
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
        this.sendMessageView = new SendMessage(main);
        this.sendMessageView.render();

        this.sendMessageView.send(this.sendMessageModel.checkInput);
    };
}