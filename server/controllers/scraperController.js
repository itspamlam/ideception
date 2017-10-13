'use strict';

// Required packages
const cheerio = require('cheerio'),
  request = require('request-promise-native');

// Define controller obj to export
const scrapeController = {};

/**
 * getMediumData - scrape meduim.com javascript route for article titles
 * outputs titles in req.locals.titles obj
 */
scrapeController.getMediumData = (req, res, next) => {
  request('https://medium.com/topic/javascript')
    .then(html => {
      // load scraped HTML into Cheerio
      let $ = cheerio.load(html);

      // parse through titles
      let titles = [];
      $('h3').each(function (i, elem) {
        let title = $(this).text();
        titles.push(title);
      });

      // add parsed titles to req.locals
      req.locals.titles = req.locals.titles ? titles.concat(req.locals.titles) : titles;

      next();
    })
    .catch(err => res.status(404).send(err));
};

const getRedditPage = (subreddit) => {
  let uri = `https://www.reddit.com/r/${subreddit}`;
  return request(uri);
};

const getRedditTitles = (html) => {
  let $ = cheerio.load(html);
  // parse through titles
  let titles = [];
  $('a.title').each(function (i, elem) {
    let title = $(this).text();
    titles.push(title);
  });
  return titles;
};

/**
 * getRedditData - scrape javascript subreddit for article titles
 * concats with titles in req.locals.titles obj
 */
scrapeController.getRedditData = (req, res, next) => {
  getRedditPage('javascript')
    .then(html => {
      let titles = getRedditTitles(html);
      // add parsed titles to req.locals
      req.locals.titles = req.locals.titles ? titles.concat(req.locals.titles) : titles;
      return getRedditPage('webdev')
    })
    .then(html => {
      let titles = getRedditTitles(html);
      // add parsed titles to req.locals
      req.locals.titles = req.locals.titles ? titles.concat(req.locals.titles) : titles;
      return getRedditPage('web_development')
    })
    .then(html => {
      let titles = getRedditTitles(html);
      // add parsed titles to req.locals
      req.locals.titles = req.locals.titles ? titles.concat(req.locals.titles) : titles;
      next();
    })
    .catch(err => res.status(404).send(err));
};

module.exports = scrapeController;