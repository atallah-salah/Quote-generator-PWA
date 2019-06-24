document.addEventListener("DOMContentLoaded", function() {
  // nav menu
  const forms = document.querySelectorAll(".side-menu");
  M.Sidenav.init(forms, { edge: "right" });

  function displayNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: 'Author',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        reg.showNotification('Quote here', options);
      });
    }
  }
  

  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);

  let cardQuote=document.querySelector("#card-quote")
  let cardContentQuote=cardQuote.querySelector("#card-content-quote");
  let cardClickMenu=document.querySelector("#menu");


  cardClickMenu.addEventListener("click",  function(){
    displayNotification()

    let quoteData = getQuote();

    cardQuote.classList.remove("scale-out");
    cardContentQuote.classList.add("scale-out");
    
    cardContentQuote.addEventListener('transitionend',function() {
      this.classList.add("scale-out");
      this.classList.remove("scale-out");
      cardContentQuote.removeEventListener('transitionend',()=>{})
      cardContentQuote.children[0].textContent=quoteData[0];
      quoteData[1] && (document.querySelector('#content-text-author').textContent=quoteData[1]);
      document.querySelector('#content-text-author').style.visibility="visible";
      
    })
    this.children[0].style.animation='load-data-animation 1s';
  });

  cardClickMenu.children[0].addEventListener('animationend',function() {
    this.style.animation='';
  });

});

