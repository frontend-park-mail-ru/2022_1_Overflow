import {eventEmitter} from "../../EventEmitter/EventEmitter";
import {ProfileModel} from "../../../Model/ProfileModel/ProfileModel";
import {Profile} from "../../../View/Profile/Profile";

export class ProfilePresenter {
    private readonly parent: Element;
    private data: {Username: string, FirstName: string, LastName: string, avatar: any, password: string};

    constructor(parent: Element) {
        this.parent = parent;
    }

    render = async () => {
        eventEmitter.cleanEvents();
        this.parent.innerHTML = '';
        const profileModel = new ProfileModel();
        await profileModel.fetchProfile();
        await profileModel.fetchGetAvatar();
        const profileView = new Profile(this.parent, profileModel.outPutData());
        profileView.render();
        eventEmitter.on('error', profileView.setError);
        profileView.submitForm(profileModel.checkInput);
        profileView.navigateBar();
    };
}