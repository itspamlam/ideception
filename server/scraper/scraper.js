'use strict';

const cheerio = require('cheerio');
const request = require('request');

const scrapeController = {
  cache: Object.create(null),
  getMediumData: (req, res, next) => {
    console.log('scraping medium now...');
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
      req.locals.mediumTitles = titles;
      
      res.status(200).send(titles);
    });
  },
  getHackerNewsData: (req, res, next) => {
    console.log('scraping hacker news now...');
    if (scrapeController.cache[req.url]) {
      setTimeout(() => scrapeController.cache[req.url] = null, 30000);
      return res.send(scrapeController.cache[req.url]);
    }
    request('https://news.ycombinator.com/newest', (err, response, html) => {
      // handle error on request
      if (err) return res.status(404).send(err);
      console.log('got html!', html);
      return res.send(html);
      // load scraped HTML into Cheerio
      let $ = cheerio.load(html);
      
      // parse through titles
      
      // add parsed titles to req.locals
      
      res.status(200).send();
    });
  }
};
  
  module.exports = scrapeController;