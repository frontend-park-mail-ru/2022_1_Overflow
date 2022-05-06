import './Input.scss';
import * as templateHBS from './Input.hbs';
import {IInput} from './IInput';

export class Input {
    private readonly props: IInput;

    constructor(
        {
            type = 'text',
            size = 'L',
            realText = '',
            text,
            id,
            className = '',
            classNameDiv = '',
        }: IInput) {
        this.props = {
            type,
            size,
            text,
            realText,
            id,
            className,
            classNameDiv
        };
    }

    render = () => {
        return templateHBS(this.props);
    };
}