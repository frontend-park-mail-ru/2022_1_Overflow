import {SignIn} from '../../components/SignIn/SignIn.js';

export class SignInRender {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        this.#parent.innerHTML = '';
        const signIn = new SignIn(this.#parent);
        signIn.render();
    };
}