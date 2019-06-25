document.addEventListener("DOMContentLoaded", function() {
  // nav menu
  const forms = document.querySelectorAll(".side-menu");
  M.Sidenav.init(forms, { edge: "right" });

  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);

  let cardQuote=document.querySelector("#card-quote")
  let cardContentQuote=cardQuote.querySelector("#card-content-quote");
  let cardClickMenu=document.querySelector("#menu");


  cardClickMenu.addEventListener("click",  function(){
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



  function send_message_to_sw(msg){
    return new Promise(function(resolve, reject){
        // Create a Message Channel
        var msg_chan = new MessageChannel();

        // Handler for recieving message reply from service worker
        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };

        // Send message to service worker along with port for reply
        if(navigator.serviceWorker.controller){
          navigator.serviceWorker.controller.postMessage(msg, [msg_chan.port2]);
        }else{
          alert('Please restart the app to use this feature')
        }
    });
  }


  document.querySelector('#setReminder').addEventListener('click',()=>{
    let timeConv={
      "10 sec test":"10000",
      "5 min":"300000",
      "30 min":"1800000",
      "1 hour":"3600000",
      "3 hours":"10800000",
      "off":false
    }

      if(document.querySelector('.optgroup-option.selected')!==null){
        send_message_to_sw(timeConv[document.querySelector('.optgroup-option.selected').innerText])
      }else{
        send_message_to_sw(timeConv["off"])
      }
    
  })

  



});

