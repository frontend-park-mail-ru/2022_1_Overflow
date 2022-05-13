import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {SecurityModel} from "../../../Model/SecurityModel/SecurityModel";
import {Security} from "../../../View/Profile/Security";

export class SecurityPresenter {
    private readonly parent: Element;

    constructor(parent: Element) {
        this.parent = parent;
    }

    render = async () => {
        eventEmitter.cleanEvents();
        this.parent.innerHTML = '';
        const securityModel = new SecurityModel();
        await securityModel.fetchProfile();
        const securityView = new Security(this.parent);
        securityView.render();
        eventEmitter.on('error', securityView.setError);
        securityView.submitForm(securityModel.checkInput);
    };
}