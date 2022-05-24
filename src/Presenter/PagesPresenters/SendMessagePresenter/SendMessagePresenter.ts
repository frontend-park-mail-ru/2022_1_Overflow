import {Header} from '../../../View/Header/Header';
import {Menu} from '../../../View/Menu/Menu';
import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {HeaderModel} from "../../../Model/HeaderModel/HeaderModel";
import {SendMessage} from "../../../View/SendMessage/SendMessage";
import {SendMessageModel} from "../../../Model/SendMessageModel/SendMessageModel";
import {MenuModel} from "../../../Model/MenuModel/MenuModel";
import {router} from "../../Router/Router";
import {urlsRouter} from "../../Router/UrlsRouter";
import {isMobile} from "../../../Utils/IsMobile/IsMobile";

export class SendMessagePresenter {
    private readonly parent: Element;
    private headerView: Header<Element>;
    private menuView: Menu<Element>;
    private menuModel: MenuModel;
    private headerModel: HeaderModel;
    private sendMessageModel: SendMessageModel;
    private sendMessageView: SendMessage<Element>;
    private data: { avatar: string, sender: string, addressee: string, theme: string, date: string, id: number, text: string };
    private flag: string;

    constructor(parent: Element) {
        this.parent = parent;
        this.flag = 'default';
        this.data = {avatar: '', sender: '', addressee: '', theme: '', date: '', text: '', id: -1};
    }

    set context(data: {avatar: string, sender: string, addressee: string, theme: string, date: string, text: string, id: number, flag: string}) {
        if (data !== null) {
            this.data = {avatar: data.avatar, sender: data.sender, addressee: data.addressee, theme: data.theme, date: data.date, id: data.id, text: data.text};
            this.flag = data.flag;
        }
    }

    render = async () => {
        const messagesOld = document.getElementById('messages');
        if (!messagesOld  || isMobile()) {
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
            messagesOld.remove();
        }
        const main = document.getElementById('main');
        if (main === null)
            return

        this.sendMessageModel = new SendMessageModel();
        await this.sendMessageModel.fetchGetProfile();
        this.sendMessageView = new SendMessage(main, this.data, this.flag);

        eventEmitter.on('error', this.sendMessageView.setError);
        eventEmitter.on('errorTheme', this.sendMessageView.setErrorTheme);
        eventEmitter.on('setAvatar', this.sendMessageView.setAvatar);
        eventEmitter.on('createPopUpDraft', this.sendMessageView.createPopUpDraft);
        eventEmitter.on('fetchDraft', this.sendMessageModel.fetchDraft);

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
            await this.sendMessageModel.fetchGetUserAvatar(this.data.addressee);
        }

        if (this.flag === 'draft') {
            await this.sendMessageModel.fetchGetUserAvatar(this.data.addressee);
        }

        this.sendMessageView.eventAddNewFile();
        this.sendMessageView.send(this.sendMessageModel.checkInput, this.sendMessageModel.fetchSendFile, this.sendMessageModel.getIdLastSend);
        this.sendMessageView.eventsLoginChange(this.sendMessageModel.fetchGetUserAvatar);
    };
}