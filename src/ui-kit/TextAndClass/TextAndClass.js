export class TextAndClass {
    #parent;
    #text;
    #class;
    #html;

    constructor(parent) {
        this.#html = `<p class="{{class}}">{{ text }}</p>`;
        this.#parent = parent;
    }

    set data(text){
        this.#text = text;
    }

    set class(text){
        this.#class = text;
    }

    render = () => {
        // eslint-disable-next-line
        const template = Handlebars.compile(this.#html);
        const html = template({
            class: this.#class,
            text: this.#text,
        });
        this.#parent.insertAdjacentHTML('beforeend', html);
    };
}

