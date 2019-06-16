importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

workbox.routing.registerRoute(
  new RegExp('https://quote-api1.herokuapp.com/'),
  workbox.strategies.cacheFirst()
);



workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "d9b6fd4212c5e778f524fd2b04f88c2f"
  },
  {
    "url": "README.md",
    "revision": "0dfb87a85cd383e2637af5bf6287bf6f"
  },
  {
    "url": "src-sw.js",
    "revision": "ed173cf9aee58344198c6ff0892258e4"
  },
  {
    "url": "src/css/content.css",
    "revision": "4718d0adf888fc7c212bb80e8a0e0893"
  },
  {
    "url": "src/css/navbar.css",
    "revision": "2bddfc80f6556d635c5e1e4ce96cbf78"
  },
  {
    "url": "src/css/style.css",
    "revision": "4faa87977c7d5597a71232e30fcf86bd"
  },
  {
    "url": "src/js/getQuotes.js",
    "revision": "0f91c25fa6186a784d591fdb7184759b"
  },
  {
    "url": "src/js/main.js",
    "revision": "ea70b27663bb09b110d84f6d3322baca"
  },
  {
    "url": "src/lib/jquery/jquery.min.js",
    "revision": "bbcf3bf05fa6cb58a67cfd0498f00d23"
  },
  {
    "url": "src/lib/materialize/materialize.min.css",
    "revision": "ec1df3ba49973dcb9ff212f052d39483"
  },
  {
    "url": "src/lib/materialize/materialize.min.js",
    "revision": "5dcfc8944ed380b2215dc28b3f13835f"
  },
  {
    "url": "workbox-config.js",
    "revision": "39bee1dde8d46afa61a171283bf1d5b8"
  }
]);