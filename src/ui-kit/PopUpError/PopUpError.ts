import * as PopUpSendMessageErrorHbs from './PopUpError.hbs';
import './PopUpError.scss';
import {Text} from "../Text/Text";
import {IPopUpError} from "./IPopUpError";
import {Input} from "../Input/Input";

export class PopUpError<T extends Element> {
    private readonly props: IPopUpError;

    constructor(
        {
            size = 'L',
            text = '',
            input = '',
            primBtn = '',
            secBtn = '',
            id,
            classNameDiv = '',
        }: IPopUpError) {
        this.props = {
            size,
            id,
            input,
            text,
            primBtn,
            secBtn,
            classNameDiv
        };
    }


    render() {
        const text = new Text({
            size: 'L',
            text: this.props.text,
        });


        return PopUpSendMessageErrorHbs({
            size: this.props.size,
            id: this.props.id,
            text: text.render(),
            input: this.props.input,
            primBtn: this.props.primBtn,
            secBtn: this.props.secBtn,
            classNameDiv: this.props.classNameDiv,
        });
    }
}