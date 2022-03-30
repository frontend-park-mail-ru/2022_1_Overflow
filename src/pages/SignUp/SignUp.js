import {SignUp} from '../../components/SignUp/SignUp.js';

export class SignUpRender {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        this.#parent.innerHTML = '';
        const signUp = new SignUp(this.#parent);
        signUp.render();
    };
}