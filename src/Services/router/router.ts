import {frontUrls} from './fronturls';

/***
 * Application router
 */
class Router {
    private __routes : Array<any>;
    private __removeListeners: (()=>void )| undefined;
    private __notFoundCallback: (()=>void )| undefined;
    private __removeNotFoundListeners: (()=>void )| undefined;
    /***
     * Class constructor
     */
    constructor() {
        this.__routes = [];
        this.__addRouterListeners();
    }

    /***
     * Start rote application
     */
    start() {
        const route = this.__routes.find((route) => this.__getCurrentPath().match(route.regExp), this);
        if (route === undefined) {
            this.redirectNotFound();
            return;
        }

        this.__removeListeners = route.callback.call(this, this.__getParamsFromRegExp(route));
    }

    /***
     * Add new route
     * @param {string} url - route url
     * @param {Function} callback - route callback
     */
    add(url: string, callback : any) {
        const lowerUrl = url.toLowerCase();
        if (!url.startsWith('/')) {
            throw new Error(`router error: invalid path ${url}; every path should start with /.`);
        }

        this.__routes.forEach((route) => {
            if (lowerUrl === route.url) {
                throw new Error(`router error: route ${url} already exists.`);
            }
        });

        const params = this.__convertParamsToRegExp(lowerUrl);
        const regExp = this.__convertUrlToRegExp(lowerUrl, params);
        this.__routes.push({
            url: lowerUrl,
            callback: callback,
            parameters: params,
            regExp: regExp
        });
    }

    /***
     * Add not found callback
     * @param {Function} callback - not found callback
     */
    addNotFound(callback: any) {
        this.__notFoundCallback = callback;
    }

    /***
     * Go to previous page
     */
    goBack() {
        window.history.back();
    }

    /***
     * Go to next page
     */
    goForward() {
        window.history.forward();
    }

    /***
     * Go back from navigation bar
     */
    navigateBack() {
        if (this.historyLength() === 2) {
            this.redirect(frontUrls.main);
            return;
        }

        this.goBack();
    }

    /***
     * count of history stack
     * @return {number}
     */
    historyLength() {
        return window.history.length;
    }

    /***
     * Redirect to url
     * @param {string} url - redirect url
     * @param {string} title - redirect title
     * @param {Object} state - redirect state
     */
    redirect(url : string, title = '', state = {}) {
        this.__removePageListeners();
        window.history.pushState(state, title, url);
        return this.start();
    }


    /***
     * Push state without redirect
     * @param {string} url - redirect url
     * @param {string} title - redirect title
     * @param {Object} state - redirect state
     */
    replaceState(url : string, title = '', state = {}) {
        window.history.replaceState(state, title, url);
    }

    /***
     * Redirect current page
     */
    redirectCurrent() {
        this.__removePageListeners();
        this.start();
    }

    /***
     * Redirect not found
     */
    redirectNotFound() {
        this.__removePageListeners();
        if (this.__notFoundCallback !== undefined) {
            this.__removeNotFoundListeners = this.__notFoundCallback;
        }
    }


    /***
     * Set page state
     * @param {Object} state - page state
     */
    setState(state : any) {
        const title = '';
        window.history.replaceState(state, title, this.__getCurrentPath());
    }

    /***
     * Get page state
     * @returns {Object}
     */
    getState() {
        return window.history.state;
    }

    /***
     * Remove page listeners
     * @private
     */
    __removePageListeners() {
        if (this.__removeListeners) {
            this.__removeListeners();
            this.__removeListeners = undefined;
        }

        if (this.__removeNotFoundListeners) {
            this.__removeNotFoundListeners();
            this.__removeNotFoundListeners = undefined;
        }
    }

    /***
     * Get parameters from route
     * @param route
     * @returns {{}|{parameters: {}}}
     * @private
     */
    __getParamsFromRegExp(route : any) {
        const emptyLength = 0;
        if (route.parameters.length === emptyLength) {
            return {};
        }

        const routeMatched = this.__getCurrentPath().match(route.regExp);
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

    /***
     * Convert url to regular expression
     * @param {string} url - route url
     * @param {Array} parameters - route parameters
     * @returns {RegExp}
     * @private
     */
    __convertUrlToRegExp(url : string, parameters : Array<any>) {
        let regExp = url
            .replace(/\//g, '\\/')
            .replace(/\./g, '\\.')
            .replace('/', '/?');

        if (this.__hasParameters(url)) {
            regExp = regExp.replace(/{\w+}/g, (param) => {
                const paramName = param
                    .replace('{', '')
                    .replace('}', '');

                return parameters.find((p) => p.name === paramName).value.regExp;
            });
        }

        return new RegExp(`^${regExp}$`);
    }

    /***
     * Convert parameters to regular expression
     * @param url
     * @returns {*[]|*}
     * @private
     */
    __convertParamsToRegExp(url : string) {
        if (this.__hasParameters(url)) {
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

    /***
     * Check thar url has parameters
     * @param {string} url - url
     * @returns {boolean}
     * @private
     */
    __hasParameters(url:string) {
        const search = /{\w+}/g;
        return search.test(url);
    }

    /***
     * Get current page path
     * @returns {string}
     * @private
     */
    __getCurrentPath() {
        return window.location.pathname;
    }

    /***
     * Redirect event
     * @param {MouseEvent} ev - mouse event
     */
    redirectEvent(ev : MouseEvent) {
        if (ev.target instanceof HTMLAnchorElement && ev.target.pathname !== '') {
            ev.preventDefault();

            this.redirect(ev.target.pathname, '', {title: document.title});
        }
    }

    /***
     * Add route listeners
     * @private
     */
    __addRouterListeners() {
        // if (!window.PopStateEvent && !('pushState' in history)) {
        //     return;
        // }

        window.addEventListener('click', (ev) => {
            this.redirectEvent(ev);
        });

        window.addEventListener('popstate', () => {
            this.__removePageListeners();
            this.start();
        });
    }

    /***
     * Get previous title
     * @returns {string|*}
     */
    getPreviousTitle() {
        if (this.getState() === undefined || this.getState() === null) {
            return 'Koya';
        }

        return this.getState().title;
    }
}

export const router = new Router();