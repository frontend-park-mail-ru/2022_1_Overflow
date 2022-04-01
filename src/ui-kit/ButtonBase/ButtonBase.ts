export class ButtonBase {
    private parent;
    private name: string;
    private classNameStr: string;
    private readonly html: string;
    private idx: number;
    private types: string;

    constructor(parent: Element) {
        this.html = '<button id="{{id}}" class="{{class}}" type="{{type}}">{{name}}</button>';
        this.parent = parent;
    }

    set data(name: string) {
        this.name = name;
    }

    set className(classNameStr: string) {
        this.classNameStr = classNameStr;
    }

    set id(idx: number) {
        this.idx = idx;
    }

    set type(types: string) {
        this.types = types;
    }

    render = () => {
        // eslint-disable-next-line
        const template = Handlebars.compile(this.html);
        const html = template({
            name: this.name,
            class: this.className,
            id: this.id,
            type: this.type,
        });
        this.parent.insertAdjacentHTML('beforeend', html);
    };
}