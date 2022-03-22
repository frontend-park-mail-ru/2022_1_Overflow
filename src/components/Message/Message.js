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
        const message = document.getElementsByClassName('message')[0];

        const ajaxSignIn = new Ajax();
        ajaxSignIn.get(
            `http://${window.location.hostname}:8080/income`,
            (status, responseText) => {
                const itemsMassage = {
                    input: []
                };
                if (status == 401)
                {
                    const signIn = new SignInRender(this.#parent);
                    signIn.render();
                }
                if (status != 200) {
                    return;
                }
                const parsed = JSON.parse(responseText);
                if (parsed == null) {
                    createElementDiv(message, '', 'messageText');
                    const parent = document.getElementsByClassName('messageText')[0];
                    createElementP(parent, 'Список писем пуст', 'messageEmpty');
                    return;
                }
                parsed.forEach((pars) => {
                    const date = new Date(pars['date']);
                    itemsMassage.input.push({
                        avatar: 'avatar',
                        title: pars['theme'],
                        subTitle: pars['text'],
                        time: (('0' + date.getDate()).slice(-2) + ':' + ('0' + (date.getMonth() + 1)).slice(-2)),
                    });
                });
                this.renderMassege(message, itemsMassage);
            }
        );
    }

    renderMassege(message, itemsMassage) {
        itemsMassage.input.forEach(function (item, index) {
            createElementDiv(message, '', 'messageText');
            const parent = document.getElementsByClassName('messageText')[index];
            createElementImg(parent, item.avatar, 'avatarMassage');
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
            parent.addEventListener('mouseover', () => {
                parent.style.backgroundSize = '100%';
                parent.style.backgroundColor = '#F1F1F1';
                parent.style.borderRadius = '15px';
            });
            parent.addEventListener('mouseout', () => {
                parent.style.backgroundColor = '#FFFFFF';
            });
        }, message);
    }
}
