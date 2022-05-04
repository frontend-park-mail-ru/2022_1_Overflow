import {getCSRFToken} from "../Network/NetworkGet";
import {eventEmitter} from "../../Presenter/EventEmitter/EventEmitter";

export class MenuModel {
    private readonly folderItems: {id: number, name: string, userId: number, date: string}[];

    constructor() {
        this.folderItems = [];
    }

    outPutFoldersName = (): {id: number, name: string, userId: number, date: string}[] => {
        return this.folderItems;
    }

    addNewFolder = async (folder_name: string) => {
        try {
            const header = await getCSRFToken(`http://${window.location.hostname}:8080/folder/add`);
            const res = await fetch(`http://${window.location.hostname}:8080/folder/add`, {
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

    rmFolder = async (id: string) => {
        try {
            const header = await getCSRFToken(`http://${window.location.hostname}:8080/folder/delete`);
            const res = await fetch(`http://${window.location.hostname}:8080/folder/delete`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                credentials: 'include',
                body: JSON.stringify({folder_name: id}),
            });
            console.log(res);
        } catch (e) {
            console.error(e);
        }
    }

    reName = async (id: number, name: string) => {
        try {
            const header = await getCSRFToken(`http://${window.location.hostname}:8080/folder/rename`);
            const res = await fetch(`http://${window.location.hostname}:8080/folder/rename`, {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-token': header,
                },
                credentials: 'include',
                body: JSON.stringify({  folder_id: id, new_folder_name: name}),
            });
            if (res.ok) {
                eventEmitter.emit('reNameFolder', {name, id});
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
            const res = await fetch(`http://${window.location.hostname}:8080/folder/list`, {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (res.ok) {
                const json: {id: number, name: string, user_id: number, created_at: string}[] = await res.json();
                json.forEach((item) => {
                    this.folderItems.push({id: item.id, name: item.name, userId: item.user_id, date: item.created_at});
                });
            }
        } catch (e) {
            console.error(e);
        }
    }
}