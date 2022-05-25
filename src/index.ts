import './index.scss';
import {eventEmitter} from "./Presenter/EventEmitter/EventEmitter";
import {router} from './Presenter/Router/Router';
import {urlsRouter} from './Presenter/Router/UrlsRouter';

// console.log(window.location.hostname);
export const http = ((window.location.hostname === '127.0.0.1') ? 'http' : 'https');
export const ws = ((window.location.hostname === '127.0.0.1') ? 'ws' : 'wss');

router.register(urlsRouter.root, eventEmitter.goToInCome);
router.register(urlsRouter.login, eventEmitter.goToSignIn);
router.register(urlsRouter.registration, eventEmitter.goToSignUp);
router.register(urlsRouter.send, eventEmitter.goToSendMessage);
router.register(urlsRouter.income, eventEmitter.goToInCome);
router.register(urlsRouter.incomeMessage, eventEmitter.goToIncomeMessage);
router.register(urlsRouter.outcome, eventEmitter.goToOutcome);
router.register(urlsRouter.outcomeMessage, eventEmitter.goToOutcomeMessage);
router.register(urlsRouter.draft, eventEmitter.goToDraft);
router.register(urlsRouter.draftMessage, eventEmitter.goToDraftMessage);
router.register(urlsRouter.spam, eventEmitter.goToSpam);
router.register(urlsRouter.spamMessage, eventEmitter.goToSpamMessage);
router.register(urlsRouter.folder, eventEmitter.goToFolder);
router.register(urlsRouter.folderMessage, eventEmitter.goToFolderMessage);
router.register(urlsRouter.profile, eventEmitter.goToProfile);
router.register(urlsRouter.security, eventEmitter.goToSecurity);

router.addNotFound(eventEmitter.goToMainPage);

router.start();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.worker.js', {scope: '/'})
        .then((reg) => {
            console.log('Успешная регистрация сервис-воркера. Scope is ' + reg);
        }).catch((error) => {
        console.log('Не удалось зарегистрировать сервис воркер: ' + error);
    });
}

const socket = new WebSocket(`${ws}://${window.location.hostname}/api/v1/ws`);

socket.onmessage = function(event) {
    if (event.data === 'okey') {
        return;
    }
    console.log(`[message] Данные получены с сервера: ${event.data}`);
    eventEmitter.emit('countEdit', event.data);
    PlaySound(`${http}://${window.location.hostname}/static/soundNewMessage.mp3`);
};

function PlaySound(path: string) {
    const audioElement = document.createElement('audio');
    audioElement.setAttribute('src', path);
    audioElement.play();
}

// socket.onopen = function (ev) {
//     console.log('open');
// }

// socket.onclose = function(event) {
//     if (event.wasClean) {
//         console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
//     } else {
//         console.log('[close] Соединение прервано');
//     }
// };
//
// socket.onerror = function(error) {
//     console.log(`[error] ${error}`);
// };

