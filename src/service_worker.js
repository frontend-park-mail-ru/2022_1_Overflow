/* eslint-disable */
'use strict';

const cacheName = 'OverflowMailCache';

const cacheUrls = [
    '/signin',
    '/mail/get',
    '/mail/income',
    '/mail/outcome',
    '/profile',

    '/static/',
];

const noCacheUrls = [
    '/signup',
    '/logout',
    '/mail/delete',
    '/mail/forward',
    '/mail/respond',
    '/mail/read',
    '/mail/send',
    '/profile/avatar',
    '/profile/avatar/set',
    '/profile/set',
]

const websiteURLs = [
    'http://localhost:8080',
    'http://95.163.249.116:8080'
]

/***
 * Fake response
 */
 class FakeResponse {
    /***
     * Get init
     * @returns {{headers: {"Content-Type": string}, status: number}}
     * @private
     */
    __getInit(request) {
        let status = 420;
        if (request.url.includes('/me')) {
            status = 401;
        }

        return {
            status: status,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    /***
     * Get body
     * @returns {Blob}
     * @private
     */
    __getBody() {
        const body = {
            message: 'no internet'
        };

        return new Blob([JSON.stringify(body)]);
    }

    /***
     * Get response
     * @returns {Response}
     */
    get(request) {
        return new Response(this.__getBody(), this.__getInit(request));
    }
}

const fakeResponse = new FakeResponse();

class GetRequestManager {
    constructor(){}

    async _handleRequest(request){
        const response = await fetch(request);
        if (response && response.ok) {
            console.log('Запись данных в кэш...');
            let cache = await caches.open(cacheName);
            await cache.put(request, response.clone());
        }

        return response;
    }

    async _offlineRequestHandler(request){
        let cache = await caches.open(cacheName);
        const match = await cache.match(request);
        
        return match;
    }

    async fetch(request){
        if(navigator.onLine){
            return await this._handleRequest(request);
        } else {
            return await this._offlineRequestHandler(request);
        }
    }
}

class PostRequestManager {
    constructor(){}

    async fetch(request){
        if(navigator.onLine){
            return await fetch(request);
        } else {
            const response = new Response( {result: 'offline'},{ headers: { 'Content-Type': 'apllication/json' }, status: 400});
            response.body = { message: 'offline' };

            return response;
        }
    }
}

const getRequestManager = new GetRequestManager();
const postRequestManager = new PostRequestManager();


self.addEventListener('install', (evt) => {
    evt.waitUntil(new Promise(resolve => {
        // установка кэшированных ручек
        caches.open(cacheName).then((cache)=>{
            resolve(cache.addAll(cacheUrls));
        });
    }));
});

self.addEventListener('activate', (evt) => {
    // установка себя контролирующим воркером
    evt.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', async (evt) => {
    // установка обработчиков
    if(evt.request.method === 'GET') {
        evt.respondWith(
            getRequestManager.fetch(evt.request)
        );
    } else {
        evt.respondWith(
            postRequestManager.fetch(evt.request)
        );
    }
});