const express    = require('express'),
      router     = express.Router();

/**
 * require controllers
 */
const frequencyController = require('../controllers/frequencyController.js'),
scraperController = require('../controllers/scraperController.js'),
fakerController = require('../controllers/fakerController.js'),
ideaController = require('../controllers/ideaController.js'),
userController = require('../controllers/userController.js');


/**
 * Scraped data handler
 *  - scrapes data from Medium and Reddit then 
 *    sanitizes the data before outputting to client
 */
router
  .route('/scraper')
  .get(scraperController.getMediumData, scraperController.getRedditData, frequencyController.sanitizeTitles);
router
  .route('/frequency-test')
  .get(frequencyController.sanitizeTitles);

/**
 * Random data handler
 *  - generates random words and random frequencies for those words
 *    before outputting to client.
 *  - accepts request input if received
 */
router // request random data
  .route('/faker')
  .get(fakerController.generateRandomWords, fakerController.generateRandomFrequencies);

/**
 * Idea handlers
 *  - Get all ideas
 *  - Create a new idea
 *  - Get all ideas for user
 */
router
  .route('/ideas')
  .get(ideaController.getIdea)
  .post(ideaController.createIdea);
router
  .route('/ideas/:userId')
  .get(ideaController.getIdeasByUser);

/**
 * Users handler
 *  - Get existing user
 *  - Create a new user
 */
router
  .route('/user')
  .get(userController.getUser)
  .post(userController.createUser);

module.exports = router;