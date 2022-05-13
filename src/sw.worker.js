// this.addEventListener('install', () => {
//
// });


const cacheName = 'overflow';

const cacheUrls = [
    '/',
    '/income',
    '/income/',
    '/security',
    '/registration',
    '/login',
    '/profile',
    '/outcome',
    '/outcome/',
    '/folder/',
    '/send',
    '/draft',
    '/draft/',
    '/spam',
    '/spam/',

    // '/fonts',

    'img/avatar.svg',
    'img/cat.jpg',
    'img/chrnovik.svg',
    'img/door.svg',
    'img/edit.svg',
    'img/input.svg',
    'img/lock.svg',
    'img/Logo.svg',
    'img/otvet.svg',
    'img/output.svg',
    'img/profile.svg',
    'img/profile.svg.svg',
    'img/reMail.svg',
    'img/sendMassege.svg',
    'img/settings.svg',
    'img/spam.svg',
    'img/strelka.svg',
    'img/Utils.svg',
];

class GetRequestManager {
    constructor(){}

    async _handleRequest(request){
        const response = await fetch(request);
        if(response && response.ok){
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
        caches.open(cacheName).then((cache)=>{
            resolve(cache.addAll(cacheUrls));
        });
    }));
});

self.addEventListener('activate', (evt) => {
    evt.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', async (evt) => {
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