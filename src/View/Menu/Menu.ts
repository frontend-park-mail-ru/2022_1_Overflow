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
import {Text} from "../../Ui-kit/Text/Text";
import {PopUpError} from "../../Ui-kit/Dilog/PopUpError";
import {Input} from "../../Ui-kit/Input/Input";
import {Button} from "../../Ui-kit/Button/Button";
import {PopUp} from "../../Ui-kit/Dropdown/PopUp";
import {calcPositionXY} from "../../Utils/CalcPositionXY/CalcPositionXY";
import rmSVG from "../image/remove.svg";
import {router} from "../../Presenter/Router/Router";
import {urlsRouter} from "../../Presenter/Router/UrlsRouter";

export class Menu<T extends Element> {
    private readonly parent: T;
    private readonly itemsMenu;
    private itemsFolder: {id: number, name: string, userId: number, date: string}[];
    private isLoading: boolean;
    private xPos: number;
    private yPos: number;
    private countNotRead: number;
    private popUpFolderOpen;
    private handlerRm: (name: string) => void;
    private handlerRename: (folderName: string, newFolderName: string, id: number) => void


    constructor(parent: T, folders: {id: number, name: string, userId: number, date: string}[], countNotRead: number) {
        this.isLoading = false;
        this.parent = parent;
        this.itemsFolder = folders;
        this.xPos = 0;
        this.yPos = 0;
        this.countNotRead = countNotRead;
        this.popUpFolderOpen = {
            id: 'popUpFolderOpen',
            content: [
                {
                    id: 'renameFolder',
                    icon: editSvg,
                    text: 'Редактировать',
                },
                {
                    id: 'rmFolder',
                    icon: rmSVG,
                    text: 'Удалить',
                },
            ],
        }
        this.itemsMenu = [
            {
                iconName: editSvg,
                textText: 'Написать',
                id: 'send'
            },
            {
                iconName: inputSvg,
                textText: 'Входящие',
                id: 'income'
            },
            {
                iconName: outSvg,
                textText: 'Отправленные',
                id: 'outcome'
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

    renderNewFolder = (data: {id: number, name: string, user_id: number, created_at: string}) => {
        const textDirectories = new Text({
            color: 'Black',
            text: data.name,
            size: 'L',
            className: 'menuText1'
        });

        const itemMenuNewFoldr: string = menuItem({
            icon: directoriesSvg,
            href: `folder/${data.name}`,
            id: data.id,
            text: textDirectories.render(),
        });

        const divPlus = document.getElementById('plus');
        if (!divPlus) {
            return;
        }
        divPlus.insertAdjacentHTML('afterend', itemMenuNewFoldr);

        const popUpNewFolder = document.getElementById('popUpNewFolder');
        if (!popUpNewFolder) {
            return;
        }
        popUpNewFolder.remove();
        this.setEventRightClickFolder({id: data.id, name: data.name, userId: data.user_id, date: data.created_at});
        this.isLoading = false;
    }

    setErrorFolderName = (data: {type: string, text: string}) => {
        const input = document.getElementById(`input${data.type}`);
        if (!input) {
            return;
        }
        input.classList.remove('inputL');
        input.classList.add('inputLError');

        const error = document.getElementById(`error${data.type}`) as HTMLDivElement;
        if (!error) {
            return;
        }
        error.style.visibility = 'visible';
        error.textContent = data.text;
        this.isLoading = false;
    }

    renderPopUpReNameFolder = (handler: (folderName: string, newFolderName: string, id: number) => void, name: string, id: number) => {
        const inputNewFolderName = new Input({
            size: 'L',
            id: 'inputReNameFolder',
            text: 'Новое имя папки',
            classNameDiv: 'botMargin',
        });

        const primBtn = new Button({
            size: 'S',
            id: 'createRename',
            text: 'Изменить',
            className: 'rightMargin'
        });

        const secBtn = new Button({
            size: 'S',
            variant: 'Secondary',
            id: 'prevRename',
            text: 'Закрыть',
        })

        const popUpNewFolder = new PopUpError({
            size: 'Auto',
            text: 'Изменить имя папки',
            input: inputNewFolderName.render(),
            error: 'errorReNameFolder',
            primBtn: primBtn.render(),
            secBtn: secBtn.render(),
            id: 'popReNameFolder',
            classNameDiv: 'sizePopUpNewFolder'
        });

        const root = document.getElementsByTagName('body')[0];
        root.insertAdjacentHTML('beforeend', popUpNewFolder.render());

        const eventClose = () => {
            const popReNameFolder = document.getElementById('popReNameFolder');
            if (!popReNameFolder) {
                return;
            }
            popReNameFolder.remove();
            this.isLoading = false;
        }
        const secBtnReName = document.getElementById('prevRename');
        if (!secBtnReName) {
            return;
        }

        secBtnReName.addEventListener('click', eventClose);

        const eventReName = async () => {
            const input = document.getElementById('inputReNameFolder') as HTMLInputElement;
            if (!input) {
                return;
            }
            this.isLoading = true;
            await handler(name, input.value, id);
        }
        const primBtnEvent = document.getElementById('createRename');
        if (!primBtnEvent) {
            return;
        }
        primBtnEvent.addEventListener('click', eventReName);
    }

    eventReNameFolder = (data: {name: string, id: number}) => {
        const element = document.getElementById(data.id.toString()) as HTMLDivElement;
        if (!element) {
            return;
        }
        const popReNameFolder = document.getElementById('popReNameFolder');
        if (!popReNameFolder) {
            return;
        }
        popReNameFolder.remove();
        element.children.item(1)!.textContent = data.name;
        this.isLoading = false;
    }

    renderPopUpNewFolder = () => {
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
            error: 'errorNewFolderName',
            primBtn: primBtn.render(),
            secBtn: secBtn.render(),
            id: 'popUpNewFolder',
            classNameDiv: 'sizePopUpNewFolder'
        });

        const root = document.getElementsByTagName('body')[0];
        root.insertAdjacentHTML('beforeend', popUpNewFolder.render());
    }

    newFolderEvent = (handler: (name: string) => void) => {
        const newFolder = document.getElementById('plus');
        if (!newFolder) {
            return;
        }

        const createPopUpNewFolder = () => {
            this.renderPopUpNewFolder();

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

            const addNewFolder = async () => {
                const inputNewFolderName = document.getElementById('inputNewFolderName') as HTMLInputElement;
                if (this.isLoading) {
                    return;
                }
                this.isLoading = true;
                if (!inputNewFolderName) {
                    return;
                }
                const nameNewFoldr: string = inputNewFolderName.value;
                handler(nameNewFoldr);
            }
            btnNewFolder.addEventListener('click', addNewFolder);
        }

        newFolder.addEventListener('click', createPopUpNewFolder);
    }

    setEventRightClickFolder = (list: {id: number, name: string, userId: number, date: string}) => {
        const getElem = document.getElementById(list.id.toString());
        if (getElem === null) {
            return;
        }
        const event = (event: MouseEvent) => {
            event.preventDefault();
            if (this.isLoading) {
                return;
            }
            this.isLoading = true;
            const popUpPrev = document.getElementById('popUpFolderOpen');
            if (popUpPrev) {
                popUpPrev.remove();
            }

            const popUp = new PopUp(this.popUpFolderOpen);
            const root = document.getElementsByTagName('body')[0];
            root.insertAdjacentHTML('beforeend', popUp.render());
            const popUpReal = document.getElementById('popUpFolderOpen') as HTMLDivElement;
            if (!popUpReal) {
                return;
            }

            const {x, y} = calcPositionXY(event.clientX, event.clientY, popUpReal);
            this.xPos = x;
            this.yPos = y;
            popUpReal.style.top = this.yPos.toString() + 'px';
            popUpReal.style.left = this.xPos.toString() + 'px';

            const docEvent: EventListenerOrEventListenerObject = async (event2) => {
                let target: HTMLElement | null = event2.target as HTMLElement;
                while (target) {
                    if (target?.id === 'renameFolder') {
                        if (this.isLoading) {
                            return;
                        }
                        this.isLoading = true;
                        popUpReal.remove();
                        document.removeEventListener('click', docEvent);
                        this.renderPopUpReNameFolder(this.handlerRename, list.name , list.id);
                        return;
                    }

                    if (target?.id === 'rmFolder') {
                        if (this.isLoading) {
                            return;
                        }
                        this.isLoading = true;
                        document.removeEventListener('click', docEvent);
                        await this.handlerRm(list.name);
                        popUpReal.remove();
                        getElem.remove();
                        this.isLoading = false;
                        return;
                    }

                    target = target.parentElement;
                    if (target === null) {
                        document.removeEventListener('click', docEvent);
                        popUpReal.remove();
                        return;
                    }
                }
            };
            document.addEventListener('click', docEvent);
            this.isLoading = false;
        }

        getElem.addEventListener('contextmenu', event);
    }

    eventRightClickMessage = (handlers: {handlerRm: (name: string) => void, handlerRename: (folderName: string, newFolderName: string, id: number) => void}) => {
        this.handlerRm = handlers.handlerRm;
        this.handlerRename = handlers.handlerRename;
        this.itemsFolder.forEach((list) => {
            this.setEventRightClickFolder(list);
        });
    }

    eventCountMinus = () => {
        const counter = document.getElementById('readCount');
        if (!counter) {
            return;
        }
        let count = Number(counter.textContent);
        count--;
        if (count === 0) {
            counter.style.visibility = 'hidden';
        }
        counter.textContent = count.toString();
    }

    eventCountPlus = () => {
        const counter = document.getElementById('readCount');
        if (!counter) {
            return;
        }
        let count = Number(counter.textContent);
        if (count === 0) {
            counter.style.visibility = 'visible';
        }
        counter.textContent = (++count).toString();
    }

    eventCountEdit = (count: string) => {
        const counter = document.getElementById('readCount');
        if (!counter) {
            return;
        }
        const tmp = Number(counter.textContent);
        if (tmp <= 0) {
            counter.style.visibility = 'visible';
        }
        counter.textContent = count;
    }

    setCurrentPath() {
        const allElem = document.getElementById('menu');
        if (!allElem) {
            return;
        }
        allElem.childNodes.forEach((item) => {
            if (item instanceof HTMLAnchorElement) {
                // console.log(item.href);
                // console.log(router.getCurrentPath());
                let href = item.href;
                const re1 = /https:\/\/(.+?)\//;
                href = href.replace(re1, '');
                href = '/' + href;
                const arrHref = href.split('/');
                const arrHrefPath = router.getCurrentPath().split('/');
                if (arrHref[1] === arrHrefPath[1] && href !== '/') {
                    if (arrHref[1] === 'folder' && arrHrefPath[1] === 'folder') {
                        if (arrHref[2] === arrHrefPath[2]) {
                            item.style.backgroundColor = "#CBCBCB";
                        } else {
                            item.style.backgroundColor = '';
                        }
                    } else {
                        item.style.backgroundColor = "#CBCBCB";
                    }
                } else {
                    item.style.backgroundColor = '';
                }
            }
        })
    }

    render = () => {
        const items: string[] = [];

        this.itemsMenu.forEach((item) => {
            let readcount = false;
            if (item.textText === 'Входящие') {
                readcount = true;
            }
            const text = new Text({
                color: 'Black',
                text: item.textText,
                size: 'L',
                className: 'menuText1'
            });
            items.push(menuItem({
                icon: item.iconName,
                href: item.id,
                readcount: readcount,
                count: this.countNotRead,
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

        this.itemsFolder.forEach((item) => {
            const textDirectories = new Text({
                color: 'Black',
                text: item.name,
                size: 'L',
                className: 'menuText1'
            });

            directories.push(menuItem({
                icon: directoriesSvg,
                id: item.id,
                href: `folder/${item.name}`,
                text: textDirectories.render(),
            }));
        })

        const main = mainHBS({
            idMain: 'main',
            items: items,
            newDirectory: newDirectory,
            directories: directories,
        });

        this.parent.insertAdjacentHTML('beforeend', main);
        eventEmitter.emit('setPath', undefined);
    }
}
