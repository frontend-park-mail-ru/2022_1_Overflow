import {MainPage} from "../Pages/MainPage/MainPage";
import {SignInRender} from "../Pages/SignIn/SignIn";
import {SignUpRender} from "../Pages/SignUp/SignUp";
import {SendMessagePresenter} from "../Pages/SendMessagePresenter/SendMessagePresenter";
import {MessagePagePresenter} from "../Pages/MessagePagePresenter/MessagePagePresenter";
import {ProfilePresenter} from "../Pages/ProfilePresenter/ProfilePresenter";
import {SecurityPresenter} from "../Pages/SecurityPresenter/SecurityPresenter";

class EventEmitter {
    private readonly events: Record<string, any>;
    private root: Element;

    constructor(root: Element) {
        this.events = {};
        this.root = root;
    }

    on = (event: string, callback: any) => {
        this.events[event] = callback;
    }

    goToMainPage = (type: string, name: string) => {
        const mainPage = new MainPage(this.root, type, name);
        mainPage.render();
    }

    goToInCome = () => {
        const mainPage = new MainPage(this.root, 'income', '');
        mainPage.render();
    }

    goToIncomeMessage = (data: {parameters: {message_id: number}}) => {
        console.log(data);
        const mainPage = new MessagePagePresenter(this.root, 'income', Number(data.parameters.message_id));
        mainPage.render();
    }

    goToOutcome = () => {
        const mainPage = new MainPage(this.root, 'output', '');
        mainPage.render();
    }

    goToOutcomeMessage = (data: {parameters: {message_id: number}}) => {
        const mainPage = new MessagePagePresenter(this.root, 'output', Number(data.parameters.message_id));
        mainPage.render();
    }

    goToDraft = () => {
        const mainPage = new MainPage(this.root, 'draft', '');
        mainPage.render();
    }

    goToDraftMessage = (data: {parameters: {message_id: number}}) => {
        const mainPage = new MessagePagePresenter(this.root, 'draft', Number(data.parameters.message_id));
        mainPage.render();
    }

    goToSpam = () => {
        const mainPage = new MainPage(this.root, 'spam', '');
        mainPage.render();
    }

    goToSpamMessage = (data: {parameters: {message_id: number}}) => {
        const mainPage = new MessagePagePresenter(this.root, 'spam', Number(data.parameters.message_id));
        mainPage.render();
    }

    goToFolder = (data: {parameters: {folder_name: string}}) => {
        const mainPage = new MainPage(this.root, data.parameters.folder_name, '');
        mainPage.render();
    }

    goToFolderMessage = (data: {parameters: {folder_name: string, message_id: number}}) => {
        const mainPage = new MessagePagePresenter(this.root, data.parameters.folder_name, Number(data.parameters.message_id));
        mainPage.render();
    }

    goToSendMessage = (data: any, type: string) => {
        const sendMessage = new SendMessagePresenter(this.root);
        if (data !== null) {
            data.flag = type;
            sendMessage.context = data;
        }
        sendMessage.render();
    }

    goToSecurity = () => {
        const profile = new SecurityPresenter(this.root);
        profile.render();
    }

    goToProfile = () => {
        const profile = new ProfilePresenter(this.root);
        profile.render();
    }

    goToMessagePage = (data: any) => {
        const sendMessage = new MessagePagePresenter(this.root, data, 0);
        sendMessage.render();
    }

    goToSignIn = () => {
        const signIn = new SignInRender(this.root);
        signIn.render();
    }

    goToSignUp = (login = '') => {
        const signUp = new SignUpRender(this.root, login);
        signUp.render();
    }

    off = (event: string) => {
        this.events[event] = null;
    }

    emit = (event: string, obj: any) => {
        if (!this.events[event]) {
            return;
        }
        this.events[event](obj);
    }

    cleanEvents = () => {
        Object.keys(this.events).forEach((event) => {
            this.events[event] = null;
        })
    }
}

const root = document.getElementsByTagName('body')[0];
export const eventEmitter = new EventEmitter(root);