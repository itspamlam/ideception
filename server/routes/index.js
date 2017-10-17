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
  .get(scraperController.getWords);
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
