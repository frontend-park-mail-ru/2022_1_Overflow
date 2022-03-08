import {createElementDiv, createElementP, createElementImg} from  "../../modules/CreateElement/createElement.js"

const itemsMassage = {
    input: [
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },
        {
            avatar: 'avatar',
            title: 'Тема сообщения',
            subTitle: 'Часть содержимого письма тут',
            time: '00:00',
        },

    ]
}

export class Message {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        createElementDiv(this.#parent, '', 'massage');
        let massage = document.getElementsByClassName('massage')[0];

        itemsMassage.input.forEach(function (item, index) {
            createElementDiv(massage, '', 'massageText');
            let parent = document.getElementsByClassName('massageText')[index];
            createElementImg(parent, item.avatar, 'avatarMassage');
            createElementP(parent, item.title, 'massageTextText');
            createElementP(parent, item.subTitle, 'massageTextSub');
            createElementP(parent, '', 'massageTextBlock');
            createElementP(parent, item.time, 'massageTextTime');
            if (itemsMassage.input.length - 1 !== index) {
                console.log(itemsMassage.length - 1);
                let hr = document.createElement('hr');
                hr.color = 'EBEBEB';
                hr.size = '1';
                hr.width = '100%'
                massage.appendChild(hr);
            }
            parent.addEventListener('mouseover', () => {
                parent.style.backgroundSize = '100%'
                parent.style.backgroundColor = '#F1F1F1';
                parent.style.borderRadius = '15px';
            })
            parent.addEventListener('mouseout', () => {
                parent.style.backgroundColor = '#FFFFFF';
            })
        }, massage);

    };
}