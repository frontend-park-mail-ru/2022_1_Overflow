import {SignInRender} from './Presenter/pages/SignIn/SignIn';
import {MainPage} from './Presenter/pages/MainPage/MainPage';
import {Ajax} from './Model/Network/Ajax';
import './index.css';
import {eventEmitter} from "./Presenter/EventEmitter/EventEmitter";

const root = document.getElementsByTagName('body')[0];

eventEmitter.goToMainPage(1)
