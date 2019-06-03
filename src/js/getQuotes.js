var api = "https://en.wikiquote.org/w/api.php";

function getRandomStart(callback) {
  $.ajax({
    url: api,
    data: {
      "action": "query",
      "format": "json",
      "titles": "List of people by name",
      "generator": "links",
      "gplnamespace": "0",
      "gpllimit": "20"
    },
    dataType: "jsonp",
    success: function(jsondata) {
      var links = jsondata.query.pages;
      var pageIds = [];
      for (var prop in links) {
        pageIds.push(links[prop].pageid);
      }
      var rand = pageIds[Math.floor(Math.random() * pageIds.length)];
      callback(rand);
    },
    error: function(xhr, callback) {
      console.log("Error getting quotes");
    }
  });
}

function getRandomName(pageId, callback) {
  $.ajax({
    url: api + "?action=query&format=json&origin=*&prop=links&pageids=" + pageId + "&redirects=1&pllimit=max&callback=?",
    dataType: "jsonp",
    success: function(jsondata) {
      var properId = Object.keys(jsondata.query.pages)[0];
      var links = jsondata.query.pages[properId].links;
      var randPerson = links[Math.floor(Math.random() * links.length)].title;
      while (randPerson.indexOf("List of people") != -1) {
        randPerson = links[Math.floor(Math.random() * links.length)].title;
      }
      currentAuthor = randPerson;
      callback(randPerson);
    },
    error: function(xhr, callback) {
      console.log("Error getting quotes");
    }
  });
}

function getRandomQuote(title, callback) {
  $.ajax({
    url: api,
    data: {
      "action": "parse",
      "format": "json",
      "origin": "*",
      "page": title,
      "prop": "text",
      "section": "1",
      "disablelimitreport": 1,
      "disabletoc": 1
    },
    dataType: "jsonp",
    success: function(jsondata) {
      var text = jsondata.parse.text["*"];
      var parser = new DOMParser();
      var doc = parser.parseFromString(text, "text/html");
      while (doc.querySelector("li > ul > li")) {
        var toRemove = doc.querySelector("li > ul");
        toRemove.parentNode.removeChild(toRemove);
      }
      var quotes = doc.querySelectorAll("ul > li");
      var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      currentQuote = randomQuote.textContent || randomQuote.innerText;
      callback(randomQuote.textContent || randomQuote.innerText);
    },
    error: function(xhr, callback) {
      console.log("Error getting quotes");
    }
  });
}

function renderQuote(callBackfunc) {
  getRandomStart(function(c) {
    getRandomName(c, function(author) {
      getRandomQuote(author, function(quote) {
        callBackfunc(quote,author)
      });
    });
  });
}

function sendTweet(quote, author) {
  var text = "";
  if (quote.length + author.length + 1 < 140) {
    text = "\"" + quote + "\" -" + author;
    console.log(text);
  } else {
    var newLength = 140 - 45 - author.length - author.length;
    var newquote = quote.replace("[\'\"]", "\\\"");
    text = author + " said, \"" + newquote.substring(0, newLength) + "\"..." + "https://en.wikiquote.org/wiki/" + author.replace(" ", "_");
  }
  $("#tweet").attr("href", "https://twitter.com/intent/tweet?text=" + text);
}
