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

    // '/fonts/Roboto-Black.ttf',
    // '/fonts/Roboto-BlackItalic.ttf',
    // '/fonts/Roboto-Bold.ttf',
    // '/fonts/Roboto-BoldItalic.ttf',
    // '/fonts/Roboto-Italic.ttf',
    // '/fonts/Roboto-Light.ttf',
    // '/fonts/Roboto-LightItalic.ttf',
    // '/fonts/Roboto-Medium.ttf',
    // '/fonts/Roboto-MediumItalic.ttf',
    // '/fonts/Roboto-Regular.ttf',
    // '/fonts/Roboto-Thin.ttf',
    // '/fonts/Roboto-ThinItalic.ttf',
];

class GetRequestManager {
    constructor(){}

    async _handleRequest(request){
        const response = await fetch(request);
        if(response && response.ok){
            let cache = await caches.open(cacheName);
            if (request.status === 200) {
                await cache.put(request, response.clone());
            }
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