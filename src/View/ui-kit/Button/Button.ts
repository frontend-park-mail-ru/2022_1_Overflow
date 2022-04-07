import './Button.css';
import * as templateHBS from './Button.hbs';
import {IButton} from './iButton'

export class Button {
    private readonly props: IButton;

    constructor({
        size = 'L',
        variant = 'Primary',
        text,
        id,
        type = 'button',
        className = '',
    }: IButton) {
        this.props = {
            size,
            variant,
            text,
            id,
            type,
            className,
        };
    }

    render = () => {
        return templateHBS(this.props);
    };
}