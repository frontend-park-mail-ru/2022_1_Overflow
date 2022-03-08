export class DiveAndClass {
    #parent;
    #name;
    #className;
    #html;

    constructor(parent) {
        this.#html = `<div class="{{class}}">{{name}}</div>`;
        this.#parent = parent;
    }

    set data(name){
        this.#name = name;
    }

    set class(name){
        this.#className = name;
    }

    render = () => {
        const template = Handlebars.compile(this.#html);
        const html = template({
            name: this.#name,
            class: this.#className,
        });
        this.#parent.insertAdjacentHTML('beforeend', html);
    };
}