import {Header} from "../../components/Header/Header.js";
import {Menu} from "../../components/Menu/Menu.js";
import {Message} from "../../components/Message/Message.js";

export class MainPage {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        this.#parent.innerHTML = '';
        const handler = new Header(this.#parent);
        handler.render();
        const menu = new Menu(this.#parent);
        menu.render();
        let main = document.getElementsByClassName('parentMain')[0];
        let message = new Message(main);
        message.render();
    };
}