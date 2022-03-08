export class TextAndClass {
    #parent;
    #text;
    #className;
    #html;

    constructor(parent) {
        this.#html = `<p class="{{class}}">{{ text }}</p>`;
        this.#parent = parent;
    }

    set data(text){
        this.#text = text;
    }

    set class(text){
        this.#className = text;
    }

    render = () => {
        // eslint-disable-next-line
        const template = Handlebars.compile(this.#html);
        const html = template({
            class: this.#className,
            text: this.#text,
        });
        this.#parent.insertAdjacentHTML('beforeend', html);
    };
}

