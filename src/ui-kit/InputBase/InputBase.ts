import Handlebars = require("handlebars");

export class InputBase {
    private parent: Element;
    private types: string;
    private idx: string;
    private placeholders: string;
    private readonly html: string;

    constructor(parent: Element) {
        this.html = '<input type="{{type}}" id="{{id}}" placeholder="{{placeholder}}">';
        this.parent = parent;
    }


    set id(name: string){
        this.idx = name;
    }

    set type(name: string){
        this.types = name;
    }

    set placeholder(name: string){
        this.placeholders = name;
    }

    render = () => {
        // eslint-disable-next-line
        const template = Handlebars.compile(this.html);
        const html = template({
            placeholder: this.placeholder,
            id: this.id,
            type: this.type,
        });
        this.parent.insertAdjacentHTML('beforeend', html);
    };
}