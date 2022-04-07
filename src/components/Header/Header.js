import {createElementDiv, createElementP, createElementImg} from '../../modules/CreateElement/createElement.js';
import {SignInRender} from '../../pages/SignIn/SignIn.js';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn.js';

export class Header {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        const head = document.createElement('header');
        this.#parent.appendChild(head);

        createElementDiv(head, '', 'parentHead');
        const divParentObject = document.querySelector('.parentHead');
        const aHref = document.createElement('a');
        aHref.href = '/';
        aHref.className = 'linked';
        createElementImg(aHref, 'Logo', 'logoLogo');
        createElementP(aHref, 'OverMail', 'logoTitle');
        divParentObject.appendChild(aHref);
        createElementDiv(divParentObject, '', 'spaseBox');
        createElementDiv(divParentObject, '', 'profile');
        const divProfile = document.querySelector('.profile');
        createElementImg(divProfile, 'avatar', 'avatar');
        createElementP(divProfile, '', 'email');
        createElementImg(divProfile, 'arrow', 'arrow');

        const avatar = document.querySelector('.avatar');
        const ajaxGetEmail = new Ajax();
        let jsonProfile;
        ajaxGetEmail.get(
            `http://${window.location.hostname}:8080/profile`,
            // eslint-disable-next-line
            (status, responseText) => {
                if (status === 401)
                {
                    const signIn = new SignInRender(this.#parent);
                    signIn.render();
                }
                if (status !== 200) {
                    return ;
                }
                jsonProfile = JSON.parse(responseText);
                const email = document.querySelector('.email');
                email.textContent = jsonProfile['Username'];
            },
        );
        ajaxGetEmail.get(
            `http://${window.location.hostname}:8080/profile/avatar`,
            // eslint-disable-next-line
            (status, responseText) => {
                if (status !== 200) {
                    return ;
                }
                const tmp = JSON.parse(responseText)
                avatar.src = tmp['message'];
            },
        );
    };
}