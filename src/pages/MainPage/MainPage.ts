import {Header} from '../../components/Header/Header';
import {Menu} from '../../components/Menu/Menu';
import {Message} from '../../components/Message/Message';

export class MainPage {
    private readonly parent: Element;

    constructor(parent: Element) {
        this.parent = parent;
    }

    render = () => {
        this.parent.innerHTML = '';
        const handler = new Header(this.parent);
        handler.render();
        const menu = new Menu(this.parent);
        menu.render();
        const main = document.getElementById('main');
        if (main === null)
            return
        const message = new Message(main);
        message.render();
    };
}