import {createElementDiv, createElementP, createElementImg} from '../../modules/CreateElement/createElement';
import {SignInRender} from '../../pages/SignIn/SignIn';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn';
import './Header.css';
import logoSvg from '../../image/Logo.svg';
import avatarSvg from '../../image/avatar.svg';
import arrowSvg from '../../image/arrow.svg';

export class Header {
    private readonly parent;

    constructor(parent: any) {
        this.parent = parent;
    }

    render = () => {
        const head = document.createElement('header');
        this.parent.appendChild(head);

        createElementDiv(head, '', 'parentHead');
        const divParentObject = document.querySelector('.parentHead');
        const aHref = document.createElement('a');
        aHref.href = '/';
        aHref.className = 'linked';
        createElementImg(aHref, 'Logo', logoSvg, 'logoLogo');
        createElementP(aHref, 'OverMail', 'logoTitle');
        divParentObject!.appendChild(aHref);
        createElementDiv(divParentObject!, '', 'spaseBox');
        createElementDiv(divParentObject!, '', 'profile');
        const divProfile = document.getElementsByClassName('profile')[0];
        createElementImg(divProfile, 'avatar', avatarSvg, 'avatar');
        createElementP(divProfile, '', 'email');
        createElementImg(divProfile, 'arrow', arrowSvg, 'arrow');
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