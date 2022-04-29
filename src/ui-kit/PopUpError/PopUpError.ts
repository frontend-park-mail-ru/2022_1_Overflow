import * as PopUpSendMessageErrorHbs from './PopUpError.hbs';
import './PopUpError.scss';
import {Text} from "../Text/Text";
import {IPopUpError} from "./IPopUpError";

export class PopUpError<T extends Element> {
    private readonly props: IPopUpError;

    constructor(
        {
            size = 'L',
            text = '',
            primBtn = '',
            secBtn = '',
            id,
            classNameDiv = '',
        }: IPopUpError) {
        this.props = {
            size,
            id,
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
            id: this.props.id,
            text: text.render(),
            primBtn: this.props.primBtn,
            secBtn: this.props.secBtn,
            classNameDiv: this.props.classNameDiv,
        });
    }
}