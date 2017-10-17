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

function normalize(val, max, min) {
  return (val - min) / (max - min);
}

scrapeController.getWords = (req, res, next) => {
  console.log('inside getWords');
  request('https://api.datamuse.com/words?v=enwiki&rel_trg=' + req.query.word)
    .then(data => {
      let jsonData = JSON.parse(data);
      let newFormatData = [];
      let dataMax = -Infinity;
      let dataMin = Infinity;
      for (let i = 0; i < jsonData.length; i += 1) {
        if (jsonData[i].score > dataMax) {
          dataMax = jsonData[i].score;
        }
        if (jsonData[i].score < dataMin) {
          dataMin = jsonData[i].score;
        }
      }
      jsonData.forEach((obj) => {
        let tempObj = {};
        tempObj.text = obj.word;
        tempObj.value = normalize(obj.score, dataMax, dataMin) * 5;
        newFormatData.push(tempObj);
      });
      console.log(newFormatData);
      res.send(200, newFormatData);
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
