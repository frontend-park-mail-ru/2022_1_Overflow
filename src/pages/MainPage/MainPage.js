import {Header} from "../../components/Header/Header.js";
import {Menu} from "../../components/Menu/Menu.js";
import {Message} from "../../components/Message/Message.js";

export class MainPage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        let tmp2 = new Header(this.#parent);
        tmp2.render();
        let tmp3 = new Menu(this.#parent);
        tmp3.render();
        let main = document.getElementsByClassName('parentMain')[0];
        let tmp4 = new Message(main);
        tmp4.render();
    };
}