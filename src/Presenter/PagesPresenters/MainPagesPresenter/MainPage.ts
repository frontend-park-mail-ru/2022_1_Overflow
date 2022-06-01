import {Header} from '../../../View/Header/Header';
import {Menu} from '../../../View/Menu/Menu';
import {Message} from '../../../View/Message/Message';
import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {HeaderModel} from "../../../Model/HeaderModel/HeaderModel";
import {MessageModel} from "../../../Model/MessageModel/MessageModel";
import {MenuModel} from "../../../Model/MenuModel/MenuModel";
import {router} from "../../Router/Router";
import {urlsRouter} from "../../Router/UrlsRouter";
import {isMobile} from "../../../Utils/IsMobile/IsMobile";

export class MainPage {
    private readonly parent: Element;
    private headerView: Header<Element>;
    private menuView: Menu<Element>;
    private menuModel: MenuModel;
    private headerModel: HeaderModel;
    private messageModel: MessageModel;
    private messageView: Message<Element>;
    private readonly type: string;
    private readonly nameMessageFolder: string;

    constructor(parent: Element, type: string, name: string) {
        this.parent = parent;
        this.type = type;
        this.nameMessageFolder = name;
    }

    render = async () => {
        const messagesOld = document.getElementById('messages');
        if (!messagesOld || isMobile()) {
            eventEmitter.cleanEvents();
            this.parent.innerHTML = '';
            this.headerModel = new HeaderModel();
            const status = await this.headerModel.getProfile();
            if (status === 7) {
                router.redirect(urlsRouter.login);
                return;
            }
            await this.headerModel.getAvatar();
            this.headerView = new Header(this.parent, this.headerModel.outputData());
            this.headerView.render();
            this.headerView.evenPopUp(this.headerModel.logout);
            this.menuModel = new MenuModel();
            await this.menuModel.getFolders();
            await this.menuModel.getCountNotRead();
            this.menuView = new Menu(this.parent, this.menuModel.outPutFoldersName(), this.menuModel.outCountNotRead());
            eventEmitter.on('setPath', this.menuView.setCurrentPath);
            eventEmitter.on('count+', this.menuView.eventCountPlus);
            eventEmitter.on('count-', this.menuView.eventCountMinus);
            eventEmitter.on('countEdit', this.menuView.eventCountEdit);
            eventEmitter.on('createFolder', this.menuView.renderNewFolder);
            eventEmitter.on('errorFolder', this.menuView.setErrorFolderName);
            eventEmitter.on('reNameFolder', this.menuView.eventReNameFolder);
            this.menuView.render();
            this.menuView.eventRightClickMessage({
                handlerRm: this.menuModel.rmFolder,
                handlerRename: this.menuModel.reName
            });
            this.menuView.newFolderEvent(this.menuModel.addNewFolder);
        } else {
            if (messagesOld?.className !== 'message') {
                messagesOld.remove();
            }
        }
        const main = document.getElementById('main');
        if (main === null)
            return

        this.messageModel = new MessageModel();
        if (this.type === 'income') {
            await this.messageModel.getMessage(this.type);
            this.messageView = new Message(main, this.messageModel.outputData()!, this.type, '');
            this.checkMessage(messagesOld);
            this.messageView.eventRightClickMessage({
                handlerGetFolders: this.messageModel.getFolders,
                handlerGetFoldersMove: this.messageModel.moveInFolderMessage,
                handlerGoToIncome: this.messageModel.rmMessageInFolder,
                handlerRm: this.messageModel.rmMessage,
                handlerSpam: this.messageModel.addInFolderMessage,
                handlerAddInFolder: this.messageModel.addInFolderMessage
            }, this.nameMessageFolder);
        }

        if (this.type === 'outcome') {
            await this.messageModel.getMessage(this.type);
            this.messageView = new Message(main, this.messageModel.outputData()!, this.type, '');
            this.checkMessage(messagesOld);
            this.messageView.eventRightClickMessage({
                handlerGetFolders: this.messageModel.getFolders,
                handlerGetFoldersMove: this.messageModel.moveInFolderMessage,
                handlerGoToIncome: this.messageModel.rmMessageInFolder,
                handlerRm: this.messageModel.rmMessage,
                handlerSpam: this.messageModel.addInFolderMessage,
                handlerAddInFolder: this.messageModel.addInFolderMessage
            }, this.nameMessageFolder);
        }

        if (this.type === 'draft') {
            await this.messageModel.getMessage('Черновики');
            this.messageView = new Message(main, this.messageModel.outputData()!, this.type, '');
            this.checkMessage(messagesOld);
            this.messageView.goToMessageEdit();
            this.messageView.eventRightClickMessage({
                handlerGetFolders: this.messageModel.getFolders,
                handlerGetFoldersMove: this.messageModel.moveInFolderMessage,
                handlerRm: this.messageModel.rmMessage,
                handlerGoToIncome: this.messageModel.rmMessageInFolder,
                handlerSpam: this.messageModel.addInFolderMessage,
                handlerAddInFolder: this.messageModel.addInFolderMessage
            }, this.nameMessageFolder);
        }

        if (this.type === 'spam') {
            await this.messageModel.getMessage('Спам');
            this.messageView = new Message(main, this.messageModel.outputData()!, this.type, '');
            this.checkMessage(messagesOld);
            this.messageView.eventRightClickMessage({
                handlerGetFolders: this.messageModel.getFolders,
                handlerGetFoldersMove: this.messageModel.moveInFolderMessage,
                handlerRm: this.messageModel.rmMessage,
                handlerGoToIncome: this.messageModel.rmMessageInFolder,
                handlerSpam: this.messageModel.addInFolderMessage,
                handlerAddInFolder: this.messageModel.addInFolderMessage
            }, this.nameMessageFolder);
        }

        if (this.type === 'folder') {
            console.log(decodeURI(this.nameMessageFolder));
            await this.messageModel.getMessage(decodeURI(this.nameMessageFolder));
            this.messageView = new Message(main, this.messageModel.outputData()!, this.type, decodeURI(this.nameMessageFolder));
            this.checkMessage(messagesOld);
            this.messageView.eventRightClickMessage({
                handlerGetFolders: this.messageModel.getFolders,
                handlerGetFoldersMove: this.messageModel.moveInFolderMessage,
                handlerGoToIncome: this.messageModel.rmMessageInFolder,
                handlerRm: this.messageModel.rmMessage,
                handlerSpam: this.messageModel.addInFolderMessage,
                handlerAddInFolder: this.messageModel.addInFolderMessage
            }, decodeURI(this.nameMessageFolder));
        }
    }

    checkMessage = (messagesOld: HTMLElement | null) => {
        if (!messagesOld || isMobile()) {
            this.messageView.render();
            return;
        }
        if (messagesOld?.className === 'message') {
            messagesOld.innerHTML = '';
            const tmp = this.messageView.renderMassage();
            if (!tmp) {
                messagesOld.innerHTML = '';
                const tmp = this.messageView.renderEmpty();
                messagesOld.insertAdjacentHTML('beforeend', tmp.at(0)!);
                return;
            }
            const elem = tmp.reduce((acc, item) => {
                return acc + item;
            }, '');
            messagesOld.insertAdjacentHTML('beforeend', elem);
        } else {
            this.messageView.render();
            return;
        }
    }
}