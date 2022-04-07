import {createElementDiv, createElementP, createElementImg} from '../../modules/CreateElement/createElement.js';
import {SignInRender} from '../../pages/SignIn/SignIn.js';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn.js';

export class Message {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        createElementDiv(this.#parent, '', 'message');
        const message = document.querySelector('.message');

        const ajax = new Ajax();
        ajax.promisifyGet(
            `http://${window.location.hostname}:8080/mail/income`,
        ).then((responseText) => {
            const parsed = JSON.parse(responseText);
            if (parsed === null) {
                createElementDiv(message, '', 'messageText1');
                const parent = document.querySelector('.messageText1');
                createElementP(parent, 'Список писем пуст', 'messageEmpty');
                return;
            }

            let itemsMassage = {
                input: []
            };

            parsed.forEach((pars) => {
                const date = new Date(pars['mail']['date']);
                itemsMassage.input.push({
                    avatar: `http://${window.location.hostname}:8080/${pars['sender_avatar']}`,
                    title: pars['mail']['theme'],
                    subTitle: pars['mail']['text'],
                    time: (('0' + date.getDate()).slice(-2) + ':' + ('0' + (date.getMonth() + 1)).slice(-2)),
                });
            });
            this.renderMassege(message, itemsMassage);
        }).catch(() => {
            const signIn = new SignInRender(this.#parent);
            signIn.render();
        });
    }

    renderMassege(message, itemsMassage) {
        itemsMassage.input.forEach(function (item, index) {
            createElementDiv(message, '', 'messageText');
            const parent = document.getElementsByClassName('messageText')[index];
            createElementImg(parent, item.avatar, 'avatarMassage');
            const avatar = document.getElementsByClassName('avatarMassage')[index];
            avatar.src = item.avatar;
            createElementP(parent, item.title, 'messageTextText');
            createElementP(parent, item.subTitle, 'messageTextSub');
            createElementP(parent, '', 'messageTextBlock');
            createElementP(parent, item.time, 'messageTextTime');
            if (itemsMassage.input.length - 1 !== index) {
                const hr = document.createElement('hr');
                hr.color = 'EBEBEB';
                hr.size = '1';
                hr.width = '100%';
                message.appendChild(hr);
            }
        }, message);
    }
}
