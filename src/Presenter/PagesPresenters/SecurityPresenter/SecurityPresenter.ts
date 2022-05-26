import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {SecurityModel} from "../../../Model/SecurityModel/SecurityModel";
import {Security} from "../../../View/Profile/Security";
import {router} from "../../Router/Router";
import {urlsRouter} from "../../Router/UrlsRouter";

export class SecurityPresenter {
    private readonly parent: Element;

    constructor(parent: Element) {
        this.parent = parent;
    }

    render = async () => {
        eventEmitter.cleanEvents();
        const main = document.getElementById('blockProfileMain');
        if (!main) {
            this.parent.innerHTML = '';
        }
        const securityModel = new SecurityModel();
        const status = await securityModel.fetchProfile();
        if (status === 7) {
            router.redirect(urlsRouter.login);
            return;
        }
        const securityView = new Security(this.parent);
        securityView.render();
        eventEmitter.on('error', securityView.setError);
        securityView.submitForm(securityModel.checkInput);
    };
}