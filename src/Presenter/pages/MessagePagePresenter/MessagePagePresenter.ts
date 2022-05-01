import {Header} from '../../../View/Header/Header';
import {Menu} from '../../../View/Menu/Menu';
import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {HeaderModel} from "../../../Model/HeaderModel/HeaderModel";
import {SendMessage} from "../../../View/SendMessage/SendMessage";
import {MessagePageModel} from "../../../Model/MessagePageModel/MessagePageModel";
import {MessagePage} from '../../../View/MessagePage/MessagePage'

export class MessagePagePresenter {
    private readonly parent: Element;
    private headerView: Header<Element>;
    private menuView: Menu<Element>;
    private headerModel: HeaderModel;
    private messagePageModel: MessagePageModel;
    private messagePageView: MessagePage<Element>;
    private readonly data: {avatar: any, id: number, login: string, theme: string, date: any, text: string};

    constructor(parent: Element, data: {avatar: any, id: number, login: string, theme: string, date: any, text: string}) {
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
        this.headerView.evenPopUp(this.headerModel.logout);

        this.menuView = new Menu(this.parent);
        this.menuView.render();
        this.menuView.newFolderEvent();
        const main = document.getElementById('main');
        if (main === null)
            return

        this.messagePageModel = new MessagePageModel(this.data.id);
        await this.messagePageModel.getMessage();
        this.data.date = this.messagePageModel.setTime(this.data.date);
        this.messagePageView = new MessagePage(main, this.data);
        this.messagePageView.render();
        this.messagePageView.forward();
        this.messagePageView.reMail();
    };
}