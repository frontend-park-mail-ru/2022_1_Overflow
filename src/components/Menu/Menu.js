import {createElementDiv, createElementP, createElementImg} from  "../../modules/CreateElement/createElement.js"
import {MainPage} from '../../pages/MainPage/MainPage.js'
import {SignInRender} from '../../pages/SignIn/SignIn.js'
import {PopUp} from '../PopUp/PopUp.js'

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
            createElementDiv(parent, item.textText, 'menuText1');
        }, parentMenu);

        let strelka = document.getElementsByClassName('strelka')[0];
        strelka.addEventListener('click', (event) => {
            event.stopPropagation();
            let popUp = new PopUp(main);
            popUp.render();
            document.addEventListener('click', (event) => {
                if (event.target.className !== 'menuText') {
                    if (document.getElementsByClassName('openFolder')[0]){
                        document.getElementsByClassName('openFolder')[0].remove();
                    }
                }
                if (event.target.className === 'menuText') {
                    let signIn = new SignInRender(this.#parent);
                    signIn.render();
                }
            });
        });
    }
}

