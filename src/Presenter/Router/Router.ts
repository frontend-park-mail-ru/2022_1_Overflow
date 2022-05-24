import {urlsRouter} from './UrlsRouter';
import {eventEmitter} from "../EventEmitter/EventEmitter";

class Router {
    private routes : Array<any>;
    private removeListeners: (()=>void )| undefined;
    private notFoundCallback: (()=>void )| undefined;
    private removeNotFoundListeners: (()=>void )| undefined;

    constructor() {
        this.routes = [];
        this.addRouterListeners();
    }

    start() {
        const route = this.routes.find((route) => this.getCurrentPath().match(route.regExp), this);
        if (route === undefined) {
            this.redirectNotFound();
            return;
        }

        this.removeListeners = route.callback.call(this, this.getParamsFromRegExp(route));
    }

    register(url: string, callback : any) {
        const lowerUrl = url.toLowerCase();
        if (!url.startsWith('/')) {
            console.error(`router error: invalid path ${url}; every path should start with /.`);
        }

        this.routes.forEach((route) => {
            if (lowerUrl === route.url) {
                console.error(`router error: route ${url} already exists.`);
            }
        });

        const params = this.convertParamsToRegExp(lowerUrl);
        const regExp = this.convertUrlToRegExp(lowerUrl, params);
        this.routes.push({
            url: lowerUrl,
            callback: callback,
            parameters: params,
            regExp: regExp
        });
    }

    addNotFound(callback: any) {
        this.notFoundCallback = callback;
    }

    goBack() {
        window.history.back();
    }

    goForward() {
        window.history.forward();
    }

    navigateBack() {
        if (window.history.length === 2) {
            this.redirect(urlsRouter.income);
            return;
        }

        this.goBack();
    }

    redirect(url : string, title = '', state = {}) {
        this.removePageListeners();
        window.history.pushState(state, title, url);
        return this.start();
    }

    replaceState(url : string, title = '', state = {}) {
        window.history.replaceState(state, title, url);
    }

    redirectCurrent() {
        this.removePageListeners();
        this.start();
    }

    redirectNotFound() {
        this.removePageListeners();
        if (this.notFoundCallback !== undefined) {
            this.removeNotFoundListeners = this.notFoundCallback;
        }
    }

    setState(state : any) {
        const title = '';
        window.history.replaceState(state, title, this.getCurrentPath());
    }

    getState() {
        return window.history.state;
    }

    removePageListeners() {
        if (this.removeListeners) {
            this.removeListeners();
            this.removeListeners = undefined;
        }

        if (this.removeNotFoundListeners) {
            this.removeNotFoundListeners();
            this.removeNotFoundListeners = undefined;
        }
    }

    getParamsFromRegExp(route : any) {
        const emptyLength = 0;
        if (route.parameters.length === emptyLength) {
            return {};
        }

        const routeMatched = this.getCurrentPath().match(route.regExp);
        if (!routeMatched) {
            return {};
        }
        routeMatched.shift();

        const params = routeMatched.reduce<Record<string, string>>((accum, param, i) => {
            const key = route.parameters[i].name;
            accum[key] = param;
            return accum;
        }, {});

        return {
            parameters: params
        };
    }

    convertUrlToRegExp(url : string, parameters : Array<any>) {
        let regExp = url
            .replace(/\//g, '\\/')
            .replace(/\./g, '\\.')
            .replace('/', '/?');

        if (this.hasParameters(url)) {
            regExp = regExp.replace(/{\w+}/g, (param) => {
                const paramName = param
                    .replace('{', '')
                    .replace('}', '');

                return parameters.find((p) => p.name === paramName).value.regExp;
            });
        }

        return new RegExp(`^${regExp}$`);
    }

    convertParamsToRegExp(url : string) {
        if (this.hasParameters(url)) {
            const params = url.match(/\{\w+\}/g);
            if (params !== null) {
                return params.reduce<any>((accum, param) => {
                    const paramName : string = param
                        .replace('{', '')
                        .replace('}', '');

                    accum.push({
                        name: paramName,
                        value: {
                            regExp: '([^\\/]+)',
                            value: null
                        }
                    });

                    return accum;
                }, []);
            }
        }

        return [];
    }

    hasParameters(url:string) {
        const search = /{\w+}/g;
        return search.test(url);
    }

    getCurrentPath() {
        return window.location.pathname;
    }

    redirectEvent(ev : MouseEvent) {
        let target: HTMLElement | null = ev.target as HTMLElement;
        while (target) {
            if (target instanceof HTMLAnchorElement) {
                const re = new RegExp('minio-storage/attach');
                if (target.pathname.match(re)){
                    console.log(target.pathname);
                    return;
                }
                console.log(target.pathname);
            }
            if (target instanceof HTMLAnchorElement && target.pathname !== '') {
                ev.preventDefault();
                if (this.getCurrentPath() === '/send') {
                    eventEmitter.emit('createPopUpDraft', target.pathname);
                    return;
                }

                this.redirect(target.pathname, '', {title: document.title});
                return;
            }
            target = target.parentElement;
        }
    }

    addRouterListeners() {
        window.addEventListener('click', (ev) => {
            this.redirectEvent(ev);
        });

        window.addEventListener('popstate', () => {
            this.removePageListeners();
            this.start();
        });
    }
}

export const router = new Router();