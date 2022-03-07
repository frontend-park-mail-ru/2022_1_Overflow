import {DiveAndClass} from "../../ui-kit/DivAndClass/DiveAndClass.js";
import {ImageAndClass} from "../../ui-kit/ImageAndClass/ImageAndClass.js";
import {TextAndClass} from "../../ui-kit/TextAndClass/TextAndClass.js";

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

        let menuParent = new DiveAndClass(main);
        menuParent.data = '';
        menuParent.class = 'parentMain';
        menuParent.render();
        let temp = document.getElementsByClassName('parentMain')[0]

        let menu = new DiveAndClass(temp);
        menu.data = '';
        menu.class = 'menu';
        menu.render();
        let parentMenu = document.getElementsByClassName('menu')[0]


        itemsMenu.input.forEach(function (item, index) {
            let manuPoint = new DiveAndClass(parentMenu);
            manuPoint.data = '';
            manuPoint.class = 'manuPoint';
            manuPoint.render();
            let parent = document.getElementsByClassName('manuPoint')[index]

            let svgMessage = new ImageAndClass(parent);
            svgMessage.data = item.iconName;
            svgMessage.class = 'iconPoint';
            svgMessage.render();

            let div = new DiveAndClass(parent);
            div.data = item.textText;
            div.class = 'menuText';
            div.render();
        }, parentMenu);
    };
}