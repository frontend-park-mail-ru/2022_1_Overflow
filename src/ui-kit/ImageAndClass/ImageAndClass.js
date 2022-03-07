export class ImageAndClass {
    #parent;
    #name;
    #class;
    #html;

    constructor(parent) {
        this.#html = `<img class="{{class}}" src="./image/{{name}}.svg" alt="{{name}}">`;
        this.#parent = parent;
    }

    set data(name){
        this.#name = name;
    }

    set class(name){
        this.#class = name;
    }

    render = () => {
        const template = Handlebars.compile(this.#html);
        const html = template({
            name: this.#name,
            class: this.#class,
        });
        this.#parent.insertAdjacentHTML('beforeend', html);
    };
}