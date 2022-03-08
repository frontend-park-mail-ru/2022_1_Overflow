import {createElementDiv, createElementP, createElementImg} from  "../../modules/CreateElement/createElement.js"

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
    };
}