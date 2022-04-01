export class DiveAndClass {
    private parent: Element;
    private name: string;
    private className: string;
    private readonly html: string;

    constructor(parent: Element) {
        this.html = '<div class="{{class}}">{{name}}</div>';
        this.parent = parent;
    }

    set data(name: string){
        this.name = name;
    }

    set class(name: string){
        this.className = name;
    }

    render = () => {
        // eslint-disable-next-line
        const template = Handlebars.compile(this.html);
        const html = template({
            name: this.name,
            class: this.className,
        });
        this.parent.insertAdjacentHTML('beforeend', html);
    };
}