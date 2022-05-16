import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {ProfileModel} from "../../../Model/ProfileModel/ProfileModel";
import {Profile} from "../../../View/Profile/Profile";
import {router} from "../../Router/Router";
import {urlsRouter} from "../../Router/UrlsRouter";

export class ProfilePresenter {
    private readonly parent: Element;
    private data: {Username: string, FirstName: string, LastName: string, avatar: string, password: string};

    constructor(parent: Element) {
        this.parent = parent;
    }

    render = async () => {
        eventEmitter.cleanEvents();
        const prev = document.getElementById('blockProfileMain')
        this.parent.innerHTML = '';
        const profileModel = new ProfileModel();
        const status = await profileModel.fetchProfile();
        if (status === 7) {
            router.redirect(urlsRouter.login);
            return;
        }
        await profileModel.fetchGetAvatar();
        const profileView = new Profile(this.parent, profileModel.outPutData());
        profileView.render();
        eventEmitter.on('error', profileView.setError);
        profileView.submitForm(profileModel.checkInput);
    };
}