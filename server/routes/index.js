const express    = require('express'),
      router     = express.Router();

/**
 * require controllers
 */
const scraperController = require('../controllers/scraperController.js'),
      ideaController = require('../controllers/ideaController.js'),
      userController = require('../controllers/userController.js');


/**
 * Scraped data handler
 *  - scrapes data from Medium and Reddit then
 *    sanitizes the data before outputting to client
 */
router
  .route('/scraper')
<<<<<<< HEAD
  .get(frequencyController.sanitizeTitles);
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

=======
  .get(scraperController.getWords);
>>>>>>> d7a81ee205066847412f781ff347c45459e11164
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
