'use strict';

// Required packages

const request = require('request-promise-native');

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
      res.status(200).send(newFormatData);
    })
    .catch(err => res.status(404).send(err));
};

module.exports = scrapeController;
