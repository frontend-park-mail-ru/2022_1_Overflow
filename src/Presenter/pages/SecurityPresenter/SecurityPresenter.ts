import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {ProfileModel} from "../../../Model/ProfileModel/ProfileModel";
import {Profile} from "../../../View/Profile/Profile";
import {SecurityModel} from "../../../Model/SecurityModel/SecurityModel";
import {Security} from "../../../View/Profile/Security";

export class SecurityPresenter {
    private readonly parent: Element;
    private data: {Username: string, FirstName: string, LastName: string, avatar: any, password: string};

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
        securityView.navigateBar();
    };
}