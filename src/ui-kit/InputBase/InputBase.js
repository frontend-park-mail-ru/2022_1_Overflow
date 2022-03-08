export class InputBase {
    #parent;
    #type;
    #id;
    #placeholder;
    #html;

    constructor(parent) {
        this.#html = `<input type="{{type}}" id="{{id}}" placeholder="{{placeholder}}">`;
        this.#parent = parent;
    }


    set id(name){
        this.#id = name;
    }

    set type(name){
        this.#type = name;
    }

    set placeholder(name){
        this.#placeholder = name;
    }

    render = () => {
        const template = Handlebars.compile(this.#html);
        const html = template({
            placeholder: this.#placeholder,
            id: this.#id,
            type: this.#type,
        });
        this.#parent.insertAdjacentHTML('beforeend', html);
    };
}