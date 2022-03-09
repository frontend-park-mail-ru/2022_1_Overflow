import {createElementDiv, createElementP, createElementImg} from '../../modules/CreateElement/createElement.js';
import {Ajax} from '../../modules/AjaxSignIn/AjaxSignIn.js';

export class Message {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        createElementDiv(this.#parent, '', 'massage');
        const massage = document.getElementsByClassName('massage')[0];


        const ajaxSignIn = new Ajax();
        ajaxSignIn.get(
            `http://${window.location.hostname}:8080/list`,
            (status, responseText) => {
                const itemsMassage = {
                    input: []
                };
                if (status != 200) {
                    return;
                }
                const parsed = JSON.parse(responseText)['content'];
                const log = JSON.parse(parsed);
                if (log == null) {
                    createElementDiv(massage, '', 'massageText');
                    const parent = document.getElementsByClassName('massageText')[0];
                    createElementP(parent, 'Список пуст', 'massageEmpty');
                    return;
                }
                log.forEach((pars) => {
                    const date = new Date(pars['date']);
                    console.log(date);
                    itemsMassage.input.push({
                        avatar: 'avatar',
                        title: pars['theme'],
                        subTitle: pars['text'],
                        time: (('0' + date.getDate()).slice(-2) + ':' + ('0' + (date.getMonth() + 1)).slice(-2)),
                    });
                });
                this.renderMassege(massage, itemsMassage);
            }
        );
    }

    renderMassege(massage, itemsMassage) {
        itemsMassage.input.forEach(function (item, index) {
            createElementDiv(massage, '', 'massageText');
            const parent = document.getElementsByClassName('massageText')[index];
            createElementImg(parent, item.avatar, 'avatarMassage');
            createElementP(parent, item.title, 'massageTextText');
            createElementP(parent, item.subTitle, 'massageTextSub');
            createElementP(parent, '', 'massageTextBlock');
            createElementP(parent, item.time, 'massageTextTime');
            if (itemsMassage.input.length - 1 !== index) {
                const hr = document.createElement('hr');
                hr.color = 'EBEBEB';
                hr.size = '1';
                hr.width = '100%';
                massage.appendChild(hr);
            }
            parent.addEventListener('mouseover', () => {
                parent.style.backgroundSize = '100%';
                parent.style.backgroundColor = '#F1F1F1';
                parent.style.borderRadius = '15px';
            });
            parent.addEventListener('mouseout', () => {
                parent.style.backgroundColor = '#FFFFFF';
            });
        }, massage);
    }
}