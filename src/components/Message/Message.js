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
    ]
}

export class Message {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        createElementDiv(this.#parent, '', 'massage');
        let temp = document.getElementsByClassName('massage')[0];

        itemsMassage.input.forEach(function (item, index) {
            createElementDiv(temp, '', 'massageText');
            let parent = document.getElementsByClassName('massageText')[index];
            createElementImg(parent, item.avatar, 'avatarMassage');
            createElementP(parent, item.title, 'massageTextText');
            createElementP(parent, item.subTitle, 'massageTextSub');
            createElementP(parent, '', 'massageTextBlock');
            createElementP(parent, item.time, 'massageTextTime');
        }, temp);
    };
}