import {SignUp} from '../../components/SignUp/SignUp.js';

export class SignUpRender {
    private readonly parent: Element;

    constructor(parent: Element) {
        this.parent = parent;
    }

    render = () => {
        this.parent.innerHTML = '';
        const signUp = new SignUp(this.parent);
        signUp.render();
    };
}