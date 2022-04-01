export class TextAndClass {
    private parent: Element;
    private text: string;
    private className: string;
    private readonly html: string;

    constructor(parent: Element) {
        this.html = '<p class="{{class}}">{{ text }}</p>';
        this.parent = parent;
    }

    set data(text: string) {
        this.text = text;
    }

    set class(className: string) {
        this.className = className;
    }

    render = () => {
        // eslint-disable-next-line
        const template = Handlebars.compile(this.html);
        const html = template({
            class: this.className,
            text: this.text,
        });
        this.parent.insertAdjacentHTML('beforeend', html);
    };
}

