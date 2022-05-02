import './Menu.scss';
import inputSvg from '../image/input.svg';
import outSvg from '../image/out.svg';
import editSvg from '../image/edit.svg';
import draftSvg from '../image/draft.svg';
import spamSvg from '../image/spam.svg';
import plusSvg from '../image/plus.svg';
import directoriesSvg from '../image/directories.svg';
import * as menuItem from './MenuItem/MenuItem.hbs';
import './MenuItem/MenuItem.scss';
import * as mainHBS from './Menu.hbs';
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {Text} from "../../ui-kit/Text/Text";
import {PopUpError} from "../../ui-kit/PopUpError/PopUpError";
import {Input} from "../../ui-kit/Input/Input";
import {Button} from "../../ui-kit/Button/Button";

export class Menu<T extends Element> {
    private readonly parent: T;
    private readonly itemsMenu;

    constructor(parent: T) {
        this.parent = parent;
        this.itemsMenu = [
            {
                iconName: editSvg,
                textText: 'Написать',
                id: 'send'
            },
            {
                iconName: inputSvg,
                textText: 'Входящие',
                id: 'input'
            },
            {
                iconName: outSvg,
                textText: 'Отправленные',
                id: 'output'
            },
            {
                iconName: draftSvg,
                textText: 'Черновик',
                id: 'draft'
            },
            {
                iconName: spamSvg,
                textText: 'Спам',
                id: 'spam'
            },
        ];
    }

    newFolderEvent = () => {
        const newFolder = document.getElementById('plus');
        if (!newFolder) {
            return;
        }

        const createPopUpNewFolder = () => {
            const inputNewFolderName = new Input({
                size: 'L',
                id: 'inputNewFolderName',
                text: 'Имя папки',
                classNameDiv: 'botMargin',
            });

            const primBtn = new Button({
                size: 'S',
                id: 'create',
                text: 'Создать',
                className: 'rightMargin'
            });

            const secBtn = new Button({
                size: 'S',
                variant: 'Secondary',
                id: 'prev',
                text: 'Закрыть',
            })

            const popUpNewFolder = new PopUpError({
                size: 'Auto',
                text: 'Создать папку',
                input: inputNewFolderName.render(),
                primBtn: primBtn.render(),
                secBtn: secBtn.render(),
                id: 'popUpNewFolder',
                classNameDiv: 'sizePopUpNewFolder'
            });

            const root = document.getElementsByTagName('body')[0];
            root.insertAdjacentHTML('beforeend', popUpNewFolder.render());

            const rmPopUpNewFolder = () => {
                const popUpNewFolder = document.getElementById('popUpNewFolder');
                if (!popUpNewFolder) {
                    return;
                }

                popUpNewFolder.remove();
            }

            const prevBtn = document.getElementById('prev');
            if (!prevBtn) {
                return;
            }

            prevBtn.addEventListener('click', rmPopUpNewFolder);

            const btnNewFolder = document.getElementById('create');
            if (!btnNewFolder) {
                return;
            }

            btnNewFolder.addEventListener('click', this.addNewFolder);
        }

        newFolder.addEventListener('click', createPopUpNewFolder);
    }

    addNewFolder = () => {
        const inputNewFolderName = document.getElementById('inputNewFolderName') as HTMLInputElement;
        if (!inputNewFolderName) {
            return;
        }
        const nameNewFoldr: string = inputNewFolderName.value;

        const textDirectories = new Text({
            color: 'Black',
            text: nameNewFoldr,
            size: 'L',
            className: 'menuText1'
        });

        const itemMenuNewFoldr = menuItem({
            icon: directoriesSvg,
            id: 'directories',
            text: textDirectories.render(),
        });

        const divMenu = document.getElementById('menu');
        if (!divMenu) {
            return;
        }
        divMenu.insertAdjacentHTML('beforeend', itemMenuNewFoldr);

        const popUpNewFolder = document.getElementById('popUpNewFolder');
        if (!popUpNewFolder) {
            return;
        }
        popUpNewFolder.remove();
    }

    render = () => {
        const items: string[] = [];

        this.itemsMenu.forEach((item) => {
            const text = new Text({
                color: 'Black',
                text: item.textText,
                size: 'L',
                className: 'menuText1'
            });
            items.push(menuItem({
                icon: item.iconName,
                id: item.id,
                text: text.render(),
            }));
        });

        const textNewDirectory = new Text({
            color: 'Black',
            text: 'Новая папка',
            size: 'L',
            className: 'menuText1'
        });

        const newDirectory = menuItem({
            icon: plusSvg,
            id: 'plus',
            text: textNewDirectory.render(),
        });

        const directories: string[] = [];

        const textDirectories = new Text({
            color: 'Black',
            text: 'Новая папка 1',
            size: 'L',
            className: 'menuText1'
        });

        directories.push(menuItem({
            icon: directoriesSvg,
            id: 'directories',
            text: textDirectories.render(),
        }));


        const main = mainHBS({
            idMain: 'main',
            items: items,
            newDirectory: newDirectory,
            directories: directories,
        });

        this.parent.insertAdjacentHTML('beforeend', main);

        const send = document.getElementById('send');
        if (send === null) {
            return;
        }
        const sendEvent = () => {
            eventEmitter.goToSendMessage(null, 'default');
        }
        send.addEventListener('click', sendEvent);

        const input = document.getElementById('input');
        if (input === null) {
            return;
        }
        const inputEvent = () => {
            eventEmitter.goToMainPage(1);
        }
        input.addEventListener('click', inputEvent);

        const output = document.getElementById('output');
        if (output === null) {
            return;
        }
        const outputEvent = () => {
            eventEmitter.goToMainPage(2);
        }
        output.addEventListener('click', outputEvent);
    };
}
