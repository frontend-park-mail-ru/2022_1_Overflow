import {SignInRender} from '../../pages/SignIn/SignIn';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn';
import './Header.css';
import logoSvg from '../../image/Logo.svg';
import avatarSvg from '../../image/avatar.svg';
import arrowSvg from '../../image/arrow.svg';
import {Text} from '../../ui-kit/Text/Text';
import * as headerHBS from './Header.hbs'
import * as handlebars from 'handlebars';


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
        handlebars.registerPartial('./logoText', logoText.render);

        const login = new Text({
            id: 'profileLogin',
            text: '',
            size: 'S',
            className: 'email'
        });
        handlebars.registerPartial('./login', login.render);

        const header = headerHBS({
            logoLink: '/',
            logoSvg: logoSvg,
            profileAvatar: avatarSvg,
            arrow: arrowSvg,
        })

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

        this.parent.insertAdjacentHTML('beforeend', header);
    };
}