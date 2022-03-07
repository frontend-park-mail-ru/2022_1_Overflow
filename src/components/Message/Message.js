import {TextAndClass} from '../../ui-kit/TextAndClass/TextAndClass.js';
import {ImageAndClass} from '../../ui-kit/ImageAndClass/ImageAndClass.js';
import {DiveAndClass} from "../../ui-kit/DivAndClass/DiveAndClass.js";

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
        let messageParent = new DiveAndClass(this.#parent);
        messageParent.data = '';
        messageParent.class = 'massage';
        messageParent.render();
        let temp = document.getElementsByClassName('massage')[0];

        itemsMassage.input.forEach(function (item, index) {
            let manuPoint = new DiveAndClass(temp);
            manuPoint.data = '';
            manuPoint.class = 'massageText';
            manuPoint.render();
            let parent = document.getElementsByClassName('massageText')[index]

            let avatar = new ImageAndClass(parent);
            avatar.data = item.avatar;
            avatar.class = 'avatarMassage';
            avatar.render();

            let title = new TextAndClass(parent);
            title.data = item.title;
            title.class = 'massageTextText';
            title.render();

            let subTitle = new TextAndClass(parent);
            title.data = item.subTitle;
            title.class = 'massageTextSub';
            title.render();

            let block = new TextAndClass(parent);
            title.data = '';
            title.class = 'massageTextBlock';
            title.render();

            let time = new TextAndClass(parent);
            time.data = item.time;
            time.class = 'massageTextTime';
            time.render();
        }, temp);
    };
}