import {SignIn} from '../../../View/SignIn/SignIn';
import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {SignInModel} from "../../../Model/SignInModel/SignInModel";

export class SignInRender {
    private readonly parent: Element;

    constructor(parent: Element) {
        this.parent = parent;
    }

    render = () => {
        this.parent.innerHTML = '';
        eventEmitter.cleanEvents();

        const signIn = new SignIn(this.parent);
        const signInModel = new SignInModel;

        signIn.render();
        eventEmitter.on('error', signIn.setError);
        signIn.submitForm(signInModel.checkInput);
    };
}