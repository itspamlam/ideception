'use strict';

// Required packages
const cheerio = require('cheerio'),
      request = require('request');

// Define controller obj to export
const scrapeController = {};

/**
 * getMediumData - scrape meduim.com javascript route for article titles
 * outputs titles in req.locals.titles obj
 */
scrapeController.getMediumData = (req, res, next) => {
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
};

/**
 * getRedditData - scrape javascript subreddit for article titles
 * concats with titles in req.locals.titles obj
 */
scrapeController.getRedditData = (req, res, next) => {
  request('https://www.reddit.com/r/javascript/', (err, response, html) => {
    // handle error on request
    if (err) return res.status(404).send(err);
    // load scraped HTML into Cheerio
    let $ = cheerio.load(html);
    // parse through titles
    let titles = [];
    $('a.title').each(function (i, elem) {
      let title = $(this).text();
      titles.push(title);
    });
    // add parsed titles to req.locals
    req.locals.titles = req.locals.titles.concat(titles);
    next();
  });
};

module.exports = scrapeController;