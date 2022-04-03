import './Text.css';
import * as templateHBS from './Text.hbs';
import {IText} from './IText'

export class Text {
    private readonly props: IText;

    constructor({
                    color = 'Black',
                    size = '300',
                    text,
                    id,
                    className = '',
    }: IText) {
        this.props = {
            color,
            size,
            text,
            id,
            className
        };
    }

    render = () => {
        return templateHBS(this.props);
    };
}

