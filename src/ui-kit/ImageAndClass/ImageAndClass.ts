export class ImageAndClass {
    private parent: Element;
    private name: string;
    private className: string;
    private readonly html: string;

    constructor(parent: Element) {
        this.html = '<img class="{{class}}" src="./image/{{name}}.svg" alt="{{name}}">';
        this.parent = parent;
    }

    set data(name: string) {
        this.name = name;
    }

    set class(className: string) {
        this.className = className;
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