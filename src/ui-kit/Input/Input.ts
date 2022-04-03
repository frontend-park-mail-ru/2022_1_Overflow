import './Input.css';
import * as templateHBS from './Input.hbs';
import {IInput} from './IInput';

export class Input {
    private readonly props: IInput;

    constructor(
        {
            type = 'text',
            size = 'L',
            text,
            id,
            className = '',
        }: IInput) {
        this.props = {
            type,
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