import {createElementDiv, createElementImg} from '../../modules/CreateElement/createElement.js';
import {SignInRender} from '../../pages/SignIn/SignIn.js';
import {PopUp} from '../PopUp/PopUp.js';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn.js';

const itemsMenu = {
    input: [
        {
            iconName: 'input',
            textText: 'Входящие',
        },
    ]
};

export class Menu {
    private readonly parent: Element;

    constructor(parent: Element) {
        this.parent = parent;
    }

    render = () => {
        const main = document.createElement('main');
        main.className = 'mainParent';
        this.parent.appendChild(main);

        createElementDiv(main, '', 'parentMain');
        const temp = document.querySelector('.parentMain');

        createElementDiv(temp, '', 'menu');
        const parentMenu = document.querySelector('.menu');

        itemsMenu.input.forEach((item, index) => {
            createElementDiv(parentMenu, '', 'manuPoint');
            const parent = document.getElementsByClassName('manuPoint')[index];
            createElementImg(parent, item.iconName, 'iconPoint1');
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
                if (event2.target.className !== 'menuText' && event2.target.className !== 'iconPoint') {
                    if (document.querySelector('.openFolder')) {
                        document.querySelector('.openFolder')!.remove();
                        document.removeEventListener('click', docEvent);
                        profile!.addEventListener('click', profileEvent);
                    }
                }
                if (event2.target.className === 'menuText' || event2.target.className === 'iconPoint') {
                    const ajaxSignIn = new Ajax();
                    ajaxSignIn.get(
                        `http://${window.location.hostname}:8080/logout`,
                        // eslint-disable-next-line
                        (status: number, responseText: string) => {
                            if (status === 401)
                            {
                                const signIn = new SignInRender(this.parent);
                                signIn.render();
                            }
                            if (status !== 200)
                                return;
                            document.removeEventListener('click', docEvent);
                            const signInnew = new SignInRender(this.parent);
                            signInnew.render();
                        },
                    );
                }
            });
        });
    };
}
