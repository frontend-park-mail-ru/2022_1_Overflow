import {MainPage} from "../pages/MainPage/MainPage";
import {SignInRender} from "../pages/SignIn/SignIn";
import {SignUpRender} from "../pages/SignUp/SignUp";
import {SendMessagePresenter} from "../pages/SendMessagePresenter/SendMessagePresenter";
import {MessageSoloPresenter} from "../pages/MessageSoloPresenter/MessageSoloPresenter";
import {ProfilePresenter} from "../pages/ProfilePresenter/ProfilePresenter";

class EventEmitter {
    private readonly events: Record<string, any>;
    private root: Element;

    constructor(root: Element) {
        this.events = {};
        this.root = root;
    }

    on(event: string, callback: any) {
        this.events[event] = callback;
    }

    goToMainPage() {
        const mainPage = new MainPage(this.root);
        mainPage.render();
    }

    goToSendMessage(data: any, type: number) {
        const sendMessage = new SendMessagePresenter(this.root);
        if (data !== null) {
            data.flag = type;
            sendMessage.context = data;
        }
        sendMessage.render();
    }

    goToProfile() {
        const profile = new ProfilePresenter(this.root);
        profile.render();
    }

    goToSoloMessage(data: any) {
        const sendMessage = new MessageSoloPresenter(this.root, data);
        sendMessage.render();
    }

    goToSignIn() {
        const signIn = new SignInRender(this.root);
        signIn.render();
    }

    goToSignUp() {
        const signUp = new SignUpRender(this.root);
        signUp.render();
    }

    off(event: string) {
        this.events[event] = null;
    }

    emit(event: string, obj: any) {
        if (!this.events[event]) {
            return;
        }
        this.events[event](obj);
    }

    cleanEvents() {
        Object.keys(this.events).forEach((event) => {
            this.events[event] = null;
        })
    }
}

const root = document.getElementsByTagName('body')[0];
export const eventEmitter = new EventEmitter(root);