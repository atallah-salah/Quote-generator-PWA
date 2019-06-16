const api='https://quote-api1.herokuapp.com/';
let groupCount = localStorage.getItem('groupCount') || 0;
let quteCount = localStorage.getItem('quteCount') || 0;
let quotes = localStorage.getItem('quotes') && localStorage.getItem('quotes').split('//,') || getAllQuotes(groupCount);

const getQuote = ()=> {
  if(quteCount>=99){
    quteCount=0;
    localStorage.setItem('quteCount',quteCount)
    localStorage.setItem('groupCount',groupCount++)
    getAllQuotes(groupCount)
  }

  localStorage.setItem('quteCount',quteCount++)
  console.log(quotes,quteCount);
  console.log(quotes[quteCount]);

  if(quotes && quotes[quteCount]){
    
    return quotes[quteCount].split('\n');
  }
}


function getAllQuotes(groupNumber=1){
  return fetch(api+groupNumber)
  .then((response)=> {
    return response.json();
  })
  .then((response)=> {
    let newQuotesArray = response.map((quote)=>{
      return (quote.quote  + quote.author + '//')
    })
    
    localStorage.setItem('quotes',newQuotesArray)
    localStorage.setItem('quteCount',0)
    localStorage.setItem('groupCount',groupNumber)
    quotes =  localStorage.getItem('quotes').split('//,');
    return quotes;
  });
}