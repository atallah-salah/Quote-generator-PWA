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




workbox.precaching.precacheAndRoute([]);