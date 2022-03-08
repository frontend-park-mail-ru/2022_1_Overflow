import {MainPage} from './pages/MainPage/MainPage.js';
import {SignInRender} from './pages/SignIn/SignIn.js';
import {SignUpRender} from './pages/SignUp/SignUp.js';


let root = document.getElementsByTagName('body')[0];

let main = new SignInRender(root);
main.render();


