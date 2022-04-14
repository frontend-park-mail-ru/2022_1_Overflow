import {Header} from '../../../View/Header/Header';
import {Menu} from '../../../View/Menu/Menu';
import {Message} from '../../../View/Message/Message';
import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {Ajax} from "../../../Model/Network/Ajax";
import {HeaderModel} from "../../../Model/HeaderModel/HeaderModel";
import {MessageModel} from "../../../Model/MessageModel/MessageModel";

export class MainPage {
    private readonly parent: Element;
    private headerView: Header<Element>;
    private menuView: Menu<Element>;
    private headerModel: HeaderModel;
    private messageModel: MessageModel;
    private messageView: Message<Element>;
    private type: number;

    constructor(parent: Element, type: number) {
        this.parent = parent;
        this.type = type;
    }

    render = async () => {
        eventEmitter.cleanEvents();
        this.parent.innerHTML = '';
        console.log('clear');
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

        this.messageModel = new MessageModel();
        if (this.type === 1){
            await this.messageModel.getMessage();
        }
        if (this.type === 2){
            await this.messageModel.getOutMessage();
        }
        this.messageView = new Message(main, this.messageModel.outputData());
        this.messageView.render();
        this.messageView.goToSoloList();
    };
}