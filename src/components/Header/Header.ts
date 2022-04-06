import {SignInRender} from '../../pages/SignIn/SignIn';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn';
import './Header.css';
import logoSvg from '../../image/Logo.svg';
import avatarSvg from '../../image/avatar.svg';
import arrowSvg from '../../image/arrow.svg';
import {Text} from '../../ui-kit/Text/Text';
import * as headerHBS from './Header.hbs';
import {PopUp} from "../PopUp/PopUp";


export class Header<T extends Element> {
    private readonly parent: T;

    constructor(parent: T) {
        this.parent = parent;
    }

    render = () => {
        const logoText = new Text({
            color: 'White',
            text: 'OverMail',
            size: 'XL',
            className: 'logoTitle'
        });

        const login = new Text({
            id: 'profileLogin',
            text: '',
            size: 'S',
            className: 'email'
        });

        const header = headerHBS({
            logoLink: '/',
            logoSvg: logoSvg,
            login: login.render(),
            logoText: logoText.render(),
            profileAvatar: avatarSvg,
            arrow: arrowSvg,
        })

        this.parent.insertAdjacentHTML('beforeend', header);

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
                document.querySelector('.email')!.textContent = jsonProfile['Username'];
            },
        );

        const profile = document.querySelector('.profile');
        let profileEvent: EventListenerOrEventListenerObject;
        profile!.addEventListener('click', profileEvent = (event: any) => {
            const popUp = new PopUp(this.parent);
            popUp.render();
            event.stopPropagation();
            profile!.removeEventListener('click', profileEvent);
            let docEvent: EventListenerOrEventListenerObject;
            document.addEventListener('click', docEvent = (event2: any) => {
                if (event2.target.className !== 'menuText' && event2.target.className !== 'iconPoint'
                    && event2.target.className !== 'exit') {
                    if (document.getElementsByClassName('openFolder')[0]) {
                        document.querySelector('.openFolder')!.remove();
                        document.removeEventListener('click', docEvent);
                        profile!.addEventListener('click', profileEvent);
                    }
                }
                if (event2.target.className === 'menuText' || event2.target.className === 'iconPoint'
                    || event2.target.className === 'exit') {
                    const ajaxSignIn = new Ajax();
                    ajaxSignIn.get(
                        `http://${window.location.hostname}:8080/logout`,
                        // eslint-disable-next-line
                        (status: number) => {
                            const signIn = new SignInRender(this.parent);
                            if (status === 401)
                            {
                                signIn.render();
                            }
                            if (status !== 200)
                                return;
                            document.removeEventListener('click', docEvent);
                            signIn.render();
                        },
                    );
                }
            });
        });
    };
}