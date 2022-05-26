import {eventEmitter} from "../EventEmitter/EventEmitter";
import {ws} from "../../index";
import {router} from "../Router/Router";
import {urlsRouter} from "../Router/UrlsRouter";

class WebSocketMessage {
    private socket: WebSocket;

    init = () => {
        this.socket = new WebSocket(`${ws}://${window.location.hostname}/api/v1/ws`);
        this.socket.onmessage = (event) => {
            if (event.data === 'okey') {
                return;
            }
            console.log(`[message] Данные получены с сервера: ${event.data}`);
            if (router.getCurrentPath() === urlsRouter.income) {
                router.redirect(urlsRouter.income);
            }
            eventEmitter.emit('countEdit', event.data);
            this.playSound(`/Audio/soundNewMessage.mp3`);
        }
    }

    playSound = (path: string) => {
        const audioElement = document.createElement('audio');
        audioElement.setAttribute('src', path);
        audioElement.play();
    }

    close = () => {
        this.socket.close();
    }
}

export const socket = new WebSocketMessage()