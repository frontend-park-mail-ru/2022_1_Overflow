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
import {PopUp} from "../../ui-kit/PopUp/PopUp";
import {calcPositionXY} from "../../Utils/CalcPositionXY/CalcPositionXY";
import rmSVG from "../image/remove.svg";

export class Menu<T extends Element> {
    private readonly parent: T;
    private readonly itemsMenu;
    private itemsFolder: {id: number, name: string, userId: number, date: string}[];
    private isLoading: boolean;
    private xPos: number;
    private yPos: number;
    private popUpFolderOpen;


    constructor(parent: T, folders: {id: number, name: string, userId: number, date: string}[]) {
        this.isLoading = false;
        this.parent = parent;
        this.itemsFolder = folders;
        this.xPos = 0;
        this.yPos = 0;
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

    renderNewFolder = (data: {id: number, name: string, user_id: number, created_at: string}) => {
        const textDirectories = new Text({
            color: 'Black',
            text: data.name,
            size: 'L',
            className: 'menuText1'
        });

        const itemMenuNewFoldr: string = menuItem({
            icon: directoriesSvg,
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

    renderPopUpReNameFolder = (handler: (id: number, name: string) => void, id: number) => {
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
            await handler(id, input.value)
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

    navigateBar = () => {
        const send = document.getElementById('send');
        if (send === null) {
            return;
        }
        const sendEvent = () => {
            if (this.isLoading) {
                return;
            }
            this.isLoading = true;
            eventEmitter.goToSendMessage(null, 'default');
        }
        send.addEventListener('click', sendEvent);

        const input = document.getElementById('input');
        if (input === null) {
            return;
        }
        const inputEvent = () => {
            if (this.isLoading) {
                return;
            }
            this.isLoading = true;
            eventEmitter.goToMainPage(1);
        }
        input.addEventListener('click', inputEvent);

        const output = document.getElementById('output');
        if (output === null) {
            return;
        }
        const outputEvent = () => {
            if (this.isLoading) {
                return;
            }
            this.isLoading = true;
            eventEmitter.goToMainPage(2);
        }
        output.addEventListener('click', outputEvent);
    }

    eventRightClickMessage = (handlers: {handlerRm: (id: string) => void, handlerRename: (id: number, name: string) => void}) => {
        this.itemsFolder.forEach((list, idx) => {
            const getElem = document.getElementById(list.id.toString());
            if (getElem === null) {
                return;
            }
            getElem.addEventListener('contextmenu', (event) => {
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
                            this.renderPopUpReNameFolder(handlers.handlerRename, list.id);
                            return;
                        }

                        if (target?.id === 'rmFolder') {
                            if (this.isLoading) {
                                return;
                            }
                            this.isLoading = true;
                            document.removeEventListener('click', docEvent);
                            popUpReal.remove();
                            getElem.remove();
                            await handlers.handlerRm(getElem.id);
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
            });
        });
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
        this.navigateBar();
    }
}
