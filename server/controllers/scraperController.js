'use strict';

const cheerio = require('cheerio');
const request = require('request');

const scrapeController = {
  cache: Object.create(null),
  getMediumData: (req, res, next) => {
    if (scrapeController.cache[req.url]) {
      setTimeout(() => scrapeController.cache[req.url] = null, 30000);
      return res.send(scrapeController.cache[req.url]);
    }
    request('https://medium.com/topic/javascript', (err, response, html) => {
      // handle error on request
      if (err) return res.status(404).send(err);
      // load scraped HTML into Cheerio
      let $ = cheerio.load(html);

      // parse through titles
      let titles = [];
      $('h3').each(function (i, elem) {
        let title = $(this).text();
        titles.push(title);
      });

      // add parsed titles to req.locals
      req.locals.titles = titles;
      
      next();
    });
  },
  getRedditData: (req, res, next) => {
    if (scrapeController.cache[req.url]) {
      setTimeout(() => scrapeController.cache[req.url] = null, 30000);
      return res.send(scrapeController.cache[req.url]);
    }
    request('https://www.reddit.com/r/javascript/', (err, response, html) => {
      // handle error on request
      if (err) return res.status(404).send(err);
      // load scraped HTML into Cheerio
      let $ = cheerio.load(html);
      // parse through titles
      let titles = [];
      $('a.title').each(function(i, elem){
        let title = $(this).text();
        titles.push(title);
      });
      // add parsed titles to req.locals
      req.locals.titles = req.locals.titles.concat(titles);
      next();
    });
  }
};
  
  module.exports = scrapeController;