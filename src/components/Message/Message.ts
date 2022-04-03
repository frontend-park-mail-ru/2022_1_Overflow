import {createElementDiv, createElementImg} from '../../modules/CreateElement/createElement';
import {SignInRender} from '../../pages/SignIn/SignIn';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn';
import './Message.css';
import avatarSvg from '../../image/avatar.svg';
import {Text} from "../../ui-kit/Text/Text";

export class Message<T extends Element> {
    private readonly parent: T;

    constructor(parent: T) {
        this.parent = parent;
    }

    render() {
        createElementDiv(this.parent, '', 'message');
        const message = document.querySelector('.message');

        const ajax = new Ajax();
        ajax.promisifyGet(
            `http://${window.location.hostname}:8080/mail/income`,
        ).then((responseText: string) => {
            const parsed = JSON.parse(responseText);
            if (parsed === null) {
                createElementDiv(message!, '', 'messageText');
                const parent = document.querySelector('.messageText');

                const emptyText = new Text({
                    color: 'Grey',
                    text: 'Список писем пуст',
                    size: 'L',
                    className: 'messageEmpty'
                });
                parent!.insertAdjacentHTML('beforeend', emptyText.render());
                return;
            }

            const itemsMassage = {
                input: [{}]
            };

            parsed.forEach((pars: any) => {
                const date = new Date(pars.date);
                itemsMassage.input.push({
                    avatar: 'avatar',
                    title: pars.theme,
                    subTitle: pars.text,
                    time: (('0' + date.getDate()).slice(-2) + ':' + ('0' + (date.getMonth() + 1)).slice(-2)),
                });
            });
            this.renderMassage(message, itemsMassage);
        }).catch(() => {
            const signIn = new SignInRender(this.parent);
            signIn.render();
        });
    }

    renderMassage(message: Element | null, itemsMassage: any) {
        itemsMassage.input.forEach((item: { avatar: string; title: string; subTitle: string; time: string; }, index: number) => {
            createElementDiv(message!, '', 'messageText');
            const parent = document.getElementsByClassName('messageText')[index];
            createElementImg(parent, item.avatar, avatarSvg, 'avatarMassage');

            const titleText = new Text({
                text: item.title,
                size: 'L',
                className: 'messageTextText'
            });
            parent!.insertAdjacentHTML('beforeend', titleText.render());

            const subText = new Text({
                text: item.subTitle,
                size: 'L',
                color: 'Grey',
                className: 'messageTextSub'
            });
            parent!.insertAdjacentHTML('beforeend', subText.render());

            const emptyText = new Text({
                text: '',
                size: 'L',
                className: 'messageTextBlock'
            });
            parent!.insertAdjacentHTML('beforeend', emptyText.render());

            const timeText = new Text({
                text: item.time,
                size: 'L',
                className: 'messageTextSub'
            });
            parent!.insertAdjacentHTML('beforeend', timeText.render());

            if (itemsMassage.input.length - 1 !== index) {
                const hr = document.createElement('hr');
                hr.color = 'EBEBEB';
                hr.size = '1';
                hr.width = '100%';
                message!.appendChild(hr);
            }
            parent.addEventListener('mouseover', () => {
                const setStyle = parent as HTMLElement;
                setStyle.style.backgroundSize = '100%';
                setStyle.style.backgroundColor = '#F1F1F1';
                setStyle.style.borderRadius = '15px';
            });
            parent.addEventListener('mouseout', () => {
                const setStyle = parent as HTMLElement;
                setStyle.style.backgroundColor = '#FFFFFF';
            });
        }, message);
    }
}
