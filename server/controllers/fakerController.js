const faker = require('faker');

const fakerController = {};

const getRandomFrequency = (max) => {
  return Math.floor(Math.random() * (max - 0 + 1)) + 0;
};

fakerController.generateRandomWords = (req, res, next) => {
  // initialize number of words to 10 if no count provided
  let numWords = req.query.count ? req.query.count : 10;
  // generate x random words and save to variable
  let randomWords = faker.random.words(numWords);
    randomWords = randomWords.split(' ').map(word => word.toLowerCase());
  // add words to req.locals
  req.locals.randomWords = randomWords;
  // continue
  next();
};

fakerController.generateRandomFrequencies = (req, res, next) => {
  if(!req.locals.randomWords) return res.status(404).send('No random words');
  // initialize max frequency to 10 if no max provided
  let maxFreq = req.query.max ? req.query.max : 10;
  let randomWords = req.locals.randomWords;

  // create array of objects with word and randomly generated frequency
  let randomWordsAndFreqs = randomWords.map(word => ({'text': word, 'value': getRandomFrequency(maxFreq)}));
  
  // respond with random words and frequencies
  res.status(200).send(randomWordsAndFreqs);
};

module.exports = fakerController;