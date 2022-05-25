import './index.scss';
import {eventEmitter} from "./Presenter/EventEmitter/EventEmitter";
import {router} from './Presenter/Router/Router';
import {urlsRouter} from './Presenter/Router/UrlsRouter';

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

const socket = new WebSocket(`wss://${window.location.hostname}/api/v1/ws`);

socket.onopen = function (ev) {
    console.log('open');
}

socket.onmessage = function(event) {
    console.log(`[message] Данные получены с сервера: ${event.data}`);
    eventEmitter.emit('countEdit', event.data);
    PlaySound('Audio/soundNewMessage.mp3');
};

function PlaySound(path: string) {
    const audioElement = document.createElement('audio');
    audioElement.setAttribute('src', path);
    audioElement.play();
}

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
        console.log('[close] Соединение прервано');
    }
};

socket.onerror = function(error) {
    console.log(`[error] ${error}`);
};

