importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

workbox.routing.registerRoute(
  new RegExp('https://quote-api1.herokuapp.com/'),
  workbox.strategies.cacheFirst()
);

let resRecived=false;
let reminder=false;
let count=1;
let quotes;
let interval;

const getQuotes= ()=>{
  if(reminder){
    interval = setInterval(() => {
      let randNum=Math.floor(Math.random() * 100);
      var options = {
        body: quotes[randNum].quote,
        vibrate: [200,30,200],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      };
      resRecived && reminder && self.registration.showNotification(quotes[randNum].author,options)
    }, reminder);
  }
}

self.addEventListener('message', function(event){
  console.log("SW Received Message: " + event.data,reminder);
  reminder=event.data;
  fetch('https://quote-api1.herokuapp.com/'+count)
  .then(function(response) {
    return response.json();    
  })
  .then(function(res) {
    quotes = res.map((quote)=>{
      return {quote:quote.quote  , author:quote.author}
    })    
    // resRecived=true;
    if(event.data===false){
      interval && clearInterval(interval); // stop the interval
      resRecived=false;
      reminder=false;
    }else{
      interval && clearInterval(interval); // stop the interval
      resRecived=true;
      getQuotes();
    }
  });
});




workbox.precaching.precacheAndRoute([
  {
    "url": "index.html",
    "revision": "822f74d7e881c5749f9335890dc75b0f"
  },
  {
    "url": "README.md",
    "revision": "0dfb87a85cd383e2637af5bf6287bf6f"
  },
  {
    "url": "src-sw.js",
    "revision": "467e7235bdf928ba2cbc6fc0ef4ec4a4"
  },
  {
    "url": "src/css/content.css",
    "revision": "a17a8c3f40fc852a7a4097b81be2d2b5"
  },
  {
    "url": "src/css/navbar.css",
    "revision": "2bddfc80f6556d635c5e1e4ce96cbf78"
  },
  {
    "url": "src/css/side-menu.css",
    "revision": "3da32c5338d61b8ae4440902a75241cc"
  },
  {
    "url": "src/css/style.css",
    "revision": "ad04ff8e763bfc2ca7bb422c89961e91"
  },
  {
    "url": "src/js/getQuotes.js",
    "revision": "41cfaa60e62ae7823d10fba925b2cae0"
  },
  {
    "url": "src/js/main.js",
    "revision": "19db1b73ce7c85ff56385a3662d71dad"
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