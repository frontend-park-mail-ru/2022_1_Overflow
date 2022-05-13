import {Header} from '../../../View/Header/Header';
import {Menu} from '../../../View/Menu/Menu';
import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {HeaderModel} from "../../../Model/HeaderModel/HeaderModel";
import {MessagePageModel} from "../../../Model/MessagePageModel/MessagePageModel";
import {MessagePage} from '../../../View/MessagePage/MessagePage'
import {MenuModel} from "../../../Model/MenuModel/MenuModel";

export class MessagePagePresenter {
    private readonly parent: Element;
    private headerView: Header<Element>;
    private menuView: Menu<Element>;
    private menuModel: MenuModel;
    private headerModel: HeaderModel;
    private messagePageModel: MessagePageModel;
    private messagePageView: MessagePage<Element>;
    private readonly type: string;
    private readonly idMsg: number;

    constructor(parent: Element, type: string, idMsg: number) {
        this.parent = parent;
        this.type = type;
        this.idMsg = idMsg;
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

        this.messagePageModel = new MessagePageModel(this.idMsg);

        await this.messagePageModel.getMessage();
        await this.messagePageModel.readMessage();
        await this.messagePageModel.getAvatar(this.type);
        this.messagePageModel.setTime();
        this.messagePageView = new MessagePage(main, this.messagePageModel.outputData());
        this.messagePageView.render();
        this.messagePageView.forward();
        this.messagePageView.reMail();
    };
}