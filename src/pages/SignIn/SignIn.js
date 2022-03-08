import {SignIn} from "../../components/SignIn/SignIn.js";

export class SignInRender {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        const signin = new SignIn(this.#parent);
        signin.render();
    };
}