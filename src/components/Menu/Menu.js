import {createElementDiv, createElementImg} from  '../../modules/CreateElement/createElement.js';
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
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        const main = document.createElement('main');
        main.className = 'mainParent';
        this.#parent.appendChild(main);

        createElementDiv(main, '', 'parentMain');
        const temp = document.querySelector('.parentMain');

        createElementDiv(temp, '', 'menu');
        const parentMenu = document.querySelector('.menu');

        itemsMenu.input.forEach(function (item, index) {
            createElementDiv(parentMenu, '', 'manuPoint');
            const parent = document.getElementsByClassName('manuPoint')[index];
            createElementImg(parent, item.iconName, 'iconPoint1');
            createElementDiv(parent, item.textText, 'menuText1');
        }, parentMenu);

        const profile = document.querySelector('.profile');
        let profileEvent;
        profile.addEventListener('click', profileEvent = (event) => {
            const popUp = new PopUp(main);
            popUp.render();
            event.stopPropagation();
            profile.removeEventListener('click', profileEvent);
            let docEvent;
            document.addEventListener('click', docEvent = (event) => {
                if (event.target.className !== 'menuText' && event.target.className !== 'iconPoint') {
                    if (document.getElementsByClassName('openFolder')[0]) {
                        document.querySelector('.openFolder').remove();
                        document.removeEventListener('click', docEvent);
                        profile.addEventListener('click', profileEvent);
                    }
                }
                if (event.target.className === 'menuText' || event.target.className === 'iconPoint') {
                    const ajaxSignIn = new Ajax();
                    ajaxSignIn.get(
                        `http://${window.location.hostname}:8080/logout`,
                        // eslint-disable-next-line
                        (status, responseText) => {
                            if (status === 401)
                            {
                                const signIn = new SignInRender(this.#parent);
                                signIn.render();
                            }
                            if (status !== 200)
                                return;
                            document.removeEventListener('click', docEvent);
                            const signIn = new SignInRender(this.#parent);
                            signIn.render();
                        },
                    );
                }
            });
        });
    };
}
