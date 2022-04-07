import {SignUp} from '../../../View/components/SignUp/SignUp';
import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {SignUpModel} from "../../../Model/SignUpModel/SignUpModel";

export class SignUpRender {
    private readonly parent: Element;

    constructor(parent: Element) {
        this.parent = parent;
    }

    render = () => {
        this.parent.innerHTML = '';
        eventEmitter.cleanEvents();

        const signUp = new SignUp(this.parent);
        const signUpModel = new SignUpModel;

        signUp.render();
        eventEmitter.on('error', signUp.setError);
        signUp.submitForm(signUpModel.checkInput);
    };
}