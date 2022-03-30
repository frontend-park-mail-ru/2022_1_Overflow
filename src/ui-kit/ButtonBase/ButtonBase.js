export class ButtonBase {
    #parent;
    #name;
    #className;
    #html;
    #id;
    #type;

    constructor(parent) {
        this.#html = '<button id="{{id}}" class="{{class}}" type="{{type}}">{{name}}</button>';
        this.#parent = parent;
    }

    set data(name){
        this.#name = name;
    }

    set className(name){
        this.#className = name;
    }

    set id(name){
        this.#id = name;
    }

    set type(name){
        this.#type = name;
    }

    render = () => {
        // eslint-disable-next-line
        const template = Handlebars.compile(this.#html);
        const html = template({
            name: this.#name,
            class: this.#className,
            id: this.#id,
            type: this.#type,
        });
        this.#parent.insertAdjacentHTML('beforeend', html);
    };
}