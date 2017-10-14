var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var request = require("request");
var cheerio = require("cheerio");
var expresshandlebars = require("express-handlebars");

mongoose.connect("mongodb://lchris19:Green2018!!@ds119585.mlab.com:19585/heroku_j1hv913n")

mongoose.connection.on("connected", function() {
    console.log("Connected to database");
})
var app = express();
// A GET request to scrape the echojs website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    request("https://www.msn.com/en-us/news", function(error, response, html) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(html);
      // Now, we grab every h2 within an article tag, and do the following:
      $("ul").each(function(i, element) {
  
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this).children("li").text();
        result.link = $(this).children("li").attr("href");
        console.log(result);
        // Using our Article model, create a new entry
        // This effectively passes the result object to the entry (and the title and link)
       // var entry = new Article(result);
  
        // Now, save that entry to the db
        // entry.save(function(err, doc) {
        //   // Log any errors
        //   if (err) {
        //     console.log(err);
        //   }
        //   // Or log the doc
        //   else {
        //     console.log(doc);
        //   }
        // });
  
      });
    });
    // Tell the browser that we finished scraping the text
    res.send("Scrape Complete");
  });

app.listen(3000, function() {
    console.log("app listening on port 3000");
})