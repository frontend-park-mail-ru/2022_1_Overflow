import {SignIn} from '../../components/SignIn/SignIn';

export class SignInRender {
    private readonly parent: Element;

    constructor(parent: Element) {
        this.parent = parent;
    }

    render = () => {
        this.parent.innerHTML = '';
        const signIn = new SignIn(this.parent);
        signIn.render();
    };
}