import {createElementDiv, createElementP, createElementImg} from '../../modules/CreateElement/createElement.js';
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
        const divParentObject = document.getElementsByClassName('parentHead')[0];
        createElementImg(divParentObject, 'Logo', 'logoLogo');
        createElementP(divParentObject, 'OverMail', 'logoTitle');
        createElementDiv(divParentObject, '', 'spaseBox');
        createElementImg(divParentObject, 'avatar', 'avatar');
        createElementP(divParentObject, '', 'email');
        createElementImg(divParentObject, 'arrow', 'arrow');
        const ajaxGetEmail = new Ajax();
        let jsonProfile;
        ajaxGetEmail.get(
            `http://${window.location.hostname}:8080/profile`,
            // eslint-disable-next-line
            (status, responseText) => {
                if (status == 401)
                {
                    const signIn = new SignInRender(root);
                    signIn.render();
                }
                if (status != 200) {
                    return ;
                }
                jsonProfile = JSON.parse(responseText);
                const email = document.getElementsByClassName('email')[0];
                email.textContent = jsonProfile['Email'];
            },
        );
    };
}