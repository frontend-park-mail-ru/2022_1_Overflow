import {createElementDiv, createElementP, createElementImg} from '../../modules/CreateElement/createElement.js';
import {SignInRender} from '../../pages/SignIn/SignIn.js';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn.js';

export class Header {
    private readonly parent;

    constructor(parent: any) {
        this.parent = parent;
    }

    render = () => {
        const head = document.createElement('header');
        this.parent.appendChild(head);

        createElementDiv(head, '', 'parentHead');
        const divParentObject = document.getElementsByClassName('parentHead')[0];
        createElementImg(divParentObject, 'Logo', 'logoLogo');
        createElementP(divParentObject, 'OverMail', 'logoTitle');
        createElementDiv(divParentObject, '', 'spaseBox');
        createElementDiv(divParentObject, '', 'profile');
        const divProfile = document.getElementsByClassName('profile')[0];
        createElementImg(divProfile, 'avatar', 'avatar');
        createElementP(divProfile, '', 'email');
        createElementImg(divProfile, 'arrow', 'arrow');
        const ajaxGetEmail = new Ajax();
        let jsonProfile;
        ajaxGetEmail.get(
            `http://${window.location.hostname}:8080/profile`,
            // eslint-disable-next-line
            (status: number, responseText: string) => {
                if (status === 401)
                {
                    const signIn = new SignInRender(this.parent);
                    signIn.render();
                }
                if (status !== 200) {
                    return ;
                }
                jsonProfile = JSON.parse(responseText);
                const email = document.querySelector('.email');
                const username = 'Username';
                email!.textContent = jsonProfile[username];
            },
        );
    };
}