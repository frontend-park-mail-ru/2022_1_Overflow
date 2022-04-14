import {Header} from '../../../View/Header/Header';
import {Menu} from '../../../View/Menu/Menu';
import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {HeaderModel} from "../../../Model/HeaderModel/HeaderModel";
import {SendMessage} from "../../../View/SendMessage/SendMessage";
import {MessageSoloModel} from "../../../Model/MessageSoloModel/MessageSoloModel";
import {MessageSolo} from '../../../View/MessageSolo/MessageSolo'

export class MessageSoloPresenter {
    private readonly parent: Element;
    private headerView: Header<Element>;
    private menuView: Menu<Element>;
    private headerModel: HeaderModel;
    private messageSoloModel: MessageSoloModel;
    private messageSoloView: MessageSolo<Element>;
    private data: {avatar: any, login: string, theme: string, date: any, text: string}

    constructor(parent: Element, data: {avatar: any, login: string, theme: string, date: any, text: string}) {
        this.parent = parent;
        this.data = data;
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

        this.messageSoloModel = new MessageSoloModel();
        this.messageSoloView = new MessageSolo(main, this.data);
        this.messageSoloView.render();
        this.messageSoloView.otvet();
        this.messageSoloView.reMail();
    };
}