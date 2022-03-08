import {SignUp} from "../../components/SignUp/SignUp.js";

export class SignUpRender {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        const signUp = new SignUp(this.#parent);
        signUp.render();
    };
}