import {createElementDiv, createElementP, createElementImg} from '../../modules/CreateElement/createElement';
import {SignInRender} from '../../pages/SignIn/SignIn';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn';
import './Message.css';
import avatarSvg from '../../image/avatar.svg';

export class Message {
    private readonly parent: Element;

    constructor(parent: Element) {
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
                createElementP(parent!, 'Список писем пуст', 'messageEmpty');
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
            createElementP(parent, item.title, 'messageTextText');
            createElementP(parent, item.subTitle, 'messageTextSub');
            createElementP(parent, '', 'messageTextBlock');
            createElementP(parent, item.time, 'messageTextTime');
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
