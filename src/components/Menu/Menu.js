import {createElementDiv, createElementP, createElementImg} from  "../../modules/CreateElement/createElement.js"
import {MainPage} from '../../pages/MainPage/MainPage.js'
import {SignInRender} from '../../pages/SignIn/SignIn.js'

const itemsMenu = {
    input: [
        {
            iconName: 'input',
            textText: 'Входящие',
        },
    ]
}

export class Menu {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        let main = document.createElement('main');
        main.className = 'mainParent'
        this.#parent.appendChild(main);


        createElementDiv(main, '', 'parentMain');
        let temp = document.getElementsByClassName('parentMain')[0];

        createElementDiv(temp, '', 'menu');
        let parentMenu = document.getElementsByClassName('menu')[0]


        itemsMenu.input.forEach(function (item, index) {
            createElementDiv(parentMenu, '', 'manuPoint');
            let parent = document.getElementsByClassName('manuPoint')[index]
            createElementImg(parent, item.iconName, 'iconPoint');
            createElementDiv(parent, item.textText, 'menuText');
        }, parentMenu);

        let strelka = document.getElementsByClassName('strelka')[0];
        strelka.addEventListener('click', () => {

            createElementDiv(main, '', 'openFolder');
            let openFolder = document.getElementsByClassName('openFolder')[0];

            createElementDiv(openFolder, '', 'exit');
            let exit = document.getElementsByClassName('exit')[0];
            createElementImg(exit, 'door', 'iconPoint');
            createElementDiv(exit, 'Выход', 'menuText');
            document.addEventListener('click', () => {  // не могу придумать как надо
                if (event.target.className !== 'openFolder') {
                    const newMain = new MainPage(this.#parent);
                    newMain.render();
                }

                if (event.target.className === 'openFolder') {
                    const newMain = new SignInRender(this.#parent);
                    newMain.render();
                }
            });
        });
    }
}