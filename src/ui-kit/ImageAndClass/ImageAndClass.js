export class ImageAndClass {
    #parent;
    #name;
    #className;
    #html;

    constructor(parent) {
        this.#html = '<img class="{{class}}" src="./image/{{name}}.svg" alt="{{name}}">';
        this.#parent = parent;
    }

    set data(name){
        this.#name = name;
    }

    set class(name){
        this.#className = name;
    }

    render = () => {
        // eslint-disable-next-line
        const template = Handlebars.compile(this.#html);
        const html = template({
            name: this.#name,
            class: this.#className,
        });
        this.#parent.insertAdjacentHTML('beforeend', html);
    };
}