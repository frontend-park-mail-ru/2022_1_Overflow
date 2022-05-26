import {getCSRFToken} from "../Network/NetworkGet";
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";
import {http} from "../../index";

export class MenuModel {
    private readonly folderItems: {id: number, name: string, userId: number, date: string}[];
    private countNotRead: number;

    constructor() {
        this.folderItems = [];
        this.countNotRead = 0;
    }

    outPutFoldersName = (): {id: number, name: string, userId: number, date: string}[] => {
        return this.folderItems;
    }

    outCountNotRead = (): number => {
        return this.countNotRead;
    }

    getCountNotRead = async () => {
        try {
            const res = await fetch(`${http}://${window.location.hostname}/api/v1/mail/countunread`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (res.ok) {
                const json: {count: number} = await res.json();
                this.countNotRead = json.count;
            }
        } catch (e) {
            console.error(e);
        }
    }

    addNewFolder = async (folder_name: string) => {
        try {
            const header = await getCSRFToken(`${http}://${window.location.hostname}/api/v1/folder/add`);
            const res = await fetch(`${http}://${window.location.hostname}/api/v1/folder/add`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                credentials: 'include',
                body: JSON.stringify({folder_name}),
            });
            if (res.ok) {
                eventEmitter.emit('createFolder', await res.json());
                return;
            }
            const json: {status: number, message: string} = await res.json();
            if (json.status === 15) {
                eventEmitter.emit('errorFolder', {text: 'Папка с таким именем уже существует', type: 'NewFolderName'});
            }
        } catch (e) {
            console.error(e);
        }
    }

    rmFolder = async (name: string) => {
        try {
            const header = await getCSRFToken(`${http}://${window.location.hostname}/api/v1/folder/delete`);
            await fetch(`${http}://${window.location.hostname}/api/v1/folder/delete`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                credentials: 'include',
                body: JSON.stringify({folder_name: name}),
            });
        } catch (e) {
            console.error(e);
        }
    }

    reName = async (folder_name: string, new_folder_name: string, id: number) => {
        try {
            const header = await getCSRFToken(`${http}://${window.location.hostname}/api/v1/folder/rename`);
            const res = await fetch(`${http}://${window.location.hostname}/api/v1/folder/rename`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                credentials: 'include',
                body: JSON.stringify({folder_name, new_folder_name}),
            });
            if (res.ok) {
                eventEmitter.emit('reNameFolder', {name: new_folder_name, id});
                return;
            }
            const json: {status: number, message: string} = await res.json();
            if (json.status === 15) {
                eventEmitter.emit('errorFolder', {text: 'Папка с таким именем уже существует', type: 'ReNameFolder'});
            }
        } catch (e) {
            console.error(e);
        }
    }

    getFolders = async () => {
        try {
            const res = await fetch(`${http}://${window.location.hostname}/api/v1/folder/list`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (res.ok) {
                const json: {amount: number , folders:[{id: number, name: string, user_id: number, created_at: string}]} = await res.json();
                if (json.folders) {
                    json.folders.forEach((item) => {
                        this.folderItems.push({id: item.id, name: item.name, userId: item.user_id, date: item.created_at});
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }
}