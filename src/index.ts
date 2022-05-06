import './index.scss';
import {eventEmitter} from "./Presenter/EventEmitter/EventEmitter";
import {router} from './Presenter/Router/Router';
import {urlsRouter} from './Presenter/Router/UrlsRouter';

router.register(urlsRouter.login, eventEmitter.goToSignIn);
router.register(urlsRouter.registration, eventEmitter.goToSignUp);
router.register(urlsRouter.send, eventEmitter.goToSendMessage);
router.register(urlsRouter.income, eventEmitter.goToInCome);
router.register(urlsRouter.incomeMessage, eventEmitter.goToIncomeMessage);
router.register(urlsRouter.outcome, eventEmitter.goToOutcome);
router.register(urlsRouter.outcomeMessage, eventEmitter.goToOutcomeMessage);
router.register(urlsRouter.drafts, eventEmitter.goToDraft);
router.register(urlsRouter.draftsMessage, eventEmitter.goToDraftMessage);
router.register(urlsRouter.spam, eventEmitter.goToSpam);
router.register(urlsRouter.spamMessage, eventEmitter.goToSpamMessage);
router.register(urlsRouter.folder, eventEmitter.goToFolder);
router.register(urlsRouter.folderMessage, eventEmitter.goToFolderMessage);

router.addNotFound(eventEmitter.goToMainPage);

router.start();
