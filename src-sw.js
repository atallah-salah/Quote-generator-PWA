importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

workbox.routing.registerRoute(
  new RegExp('https://quote-api1.herokuapp.com/'),
  workbox.strategies.cacheFirst()
);



workbox.precaching.precacheAndRoute([]);