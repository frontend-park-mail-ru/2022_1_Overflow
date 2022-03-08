import {MainPage} from './pages/MainPage/MainPage.js';
import {SignInRender} from './pages/SignIn/SignIn.js';
import {SignUpRender} from './pages/SignUp/SignUp.js';


const root = document.getElementsByTagName('body')[0];

const main = new SignInRender(root);
main.render();


