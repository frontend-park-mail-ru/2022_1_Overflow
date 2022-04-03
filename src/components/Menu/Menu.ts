import {createElementDiv, createElementImg} from '../../modules/CreateElement/createElement';
import {SignInRender} from '../../pages/SignIn/SignIn';
import {PopUp} from '../PopUp/PopUp';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn';
import './Menu.css';
import inputSvg from '../../image/input.svg';

const itemsMenu = {
    input: [
        {
            iconName: 'input',
            textText: 'Входящие',
        },
    ]
};

export class Menu<T extends Element> {
    private readonly parent: T;

    constructor(parent: T) {
        this.parent = parent;
    }

    render = () => {
        const main = document.createElement('main');
        main.className = 'mainParent';
        this.parent.appendChild(main);

        createElementDiv(main, '', 'parentMain');
        const temp = document.querySelector('.parentMain');

        createElementDiv(temp!, '', 'menu');
        const parentMenu = document.querySelector('.menu');

        itemsMenu.input.forEach((item, index) => {
            createElementDiv(parentMenu!, '', 'manuPoint');
            const parent = document.getElementsByClassName('manuPoint')[index];
            createElementImg(parent, item.iconName, inputSvg, 'iconPoint1');
            createElementDiv(parent, item.textText, 'menuText1');
        }, parentMenu);

        const profile = document.querySelector('.profile');
        let profileEvent: EventListenerOrEventListenerObject;
        profile!.addEventListener('click', profileEvent = (event: any) => {
            const popUp = new PopUp(main);
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
