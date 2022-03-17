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
        const temp = document.getElementsByClassName('parentMain')[0];

        createElementDiv(temp, '', 'menu');
        const parentMenu = document.getElementsByClassName('menu')[0];

        itemsMenu.input.forEach(function (item, index) {
            createElementDiv(parentMenu, '', 'manuPoint');
            const parent = document.getElementsByClassName('manuPoint')[index];
            createElementImg(parent, item.iconName, 'iconPoint1');
            createElementDiv(parent, item.textText, 'menuText1');
        }, parentMenu);

        const arrow = document.getElementsByClassName('arrow')[0];
        let arrowEvent;
        arrow.addEventListener('click', arrowEvent = (event) => {
            event.stopPropagation();
            arrow.removeEventListener('click', arrowEvent);
            const popUp = new PopUp(main);
            popUp.render();
            let docEvent;
            document.addEventListener('click', docEvent = (event) => {
                if (event.target.className !== 'menuText' && event.target.className !== 'iconPoint') {
                    if (document.getElementsByClassName('openFolder')[0]) {
                        document.getElementsByClassName('openFolder')[0].remove();
                        document.removeEventListener('click', docEvent);
                        arrow.addEventListener('click', arrowEvent);
                    }
                }
                if (event.target.className === 'menuText' || event.target.className === 'iconPoint') {
                    const ajaxSignIn = new Ajax();
                    ajaxSignIn.get(
                        `http://${window.location.hostname}:8080/logout`,
                        // eslint-disable-next-line
                        (status, responseText) => {
                            if (status != 200)
                                return;
                            const signIn = new SignInRender(this.#parent);
                            signIn.render();
                        },
                    );
                }
            });
        });
    };
}

