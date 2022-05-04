import {Header} from '../../../View/Header/Header';
import {Menu} from '../../../View/Menu/Menu';
import {Message} from '../../../View/Message/Message';
import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {HeaderModel} from "../../../Model/HeaderModel/HeaderModel";
import {MessageModel} from "../../../Model/MessageModel/MessageModel";
import {MenuModel} from "../../../Model/MenuModel/MenuModel";

export class MainPage {
    private readonly parent: Element;
    private headerView: Header<Element>;
    private menuView: Menu<Element>;
    private menuModel: MenuModel;
    private headerModel: HeaderModel;
    private messageModel: MessageModel;
    private messageView: Message<Element>;
    private readonly type: number;

    constructor(parent: Element, type: number) {
        this.parent = parent;
        this.type = type;
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

        this.menuModel = new MenuModel();
        await this.menuModel.getFolders();
        this.menuView = new Menu(this.parent, this.menuModel.outPutFoldersName());
        eventEmitter.on('createFolder', this.menuView.renderNewFolder);
        eventEmitter.on('errorFolder', this.menuView.setErrorFolderName);
        eventEmitter.on('reNameFolder', this.menuView.eventReNameFolder);
        this.menuView.render();
        this.menuView.eventRightClickMessage({handlerRm: this.menuModel.rmFolder, handlerRename: this.menuModel.reName});
        this.menuView.newFolderEvent(this.menuModel.addNewFolder);
        const main = document.getElementById('main');
        if (main === null)
            return

        this.messageModel = new MessageModel();
        if (this.type === 1){
            await this.messageModel.getMessage();
            this.messageView = new Message(main, this.messageModel.outputData()!, 1);
        }
        if (this.type === 2){
            await this.messageModel.getOutComeMessage();
            this.messageView = new Message(main, this.messageModel.outputData()!, 2);
        }
        this.messageView.render();
        this.messageView.goToMessagePage();
        this.messageView.eventRightClickMessage({
            handlerGetFolders: this.messageModel.getFolders,
            handlerRm: this.messageModel.rmMessage,
            handlerSpam: this.messageModel.rmMessage,
            handlerAddInFolder: this.messageModel.rmMessage
        });
    }
}