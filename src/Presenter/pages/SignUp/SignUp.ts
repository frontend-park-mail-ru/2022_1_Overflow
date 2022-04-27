import {SignUp} from '../../../View/SignUp/SignUp';
import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {SignUpModel} from "../../../Model/SignUpModel/SignUpModel";

export class SignUpRender {
    private readonly parent: Element;
    private readonly login: string;

    constructor(parent: Element, login: string) {
        this.parent = parent;
        this.login = login;
    }

    render = () => {
        this.parent.innerHTML = '';
        eventEmitter.cleanEvents();

        const signUp = new SignUp(this.parent, this.login);
        const signUpModel = new SignUpModel;

        signUp.render();
        eventEmitter.on('error', signUp.setError);
        signUp.submitForm(signUpModel.checkInput);
    };
}