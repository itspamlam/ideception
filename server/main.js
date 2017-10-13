const bodyParser    = require('body-parser'),
      express       = require('express'),
      path          = require('path'),
      app           = express();

/**
 * require controllers
 */
const scraperController = require('./controllers/scraperController.js');
const frequencyController = require('./controllers/frequencyController.js');
/**
 * Create middleware function for scraper controller to add locals object to request for adding data
 */
const createLocalsObj = (req, res, next) => {
  req.locals = {};
  next();
};

/**
 * Express middleware to serve all static files from client folder
 */
app.use(express.static(path.join(__dirname, 'client')));


/**
 * Body-parser middleware to automatically parse request body data and store in req.body
 */
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
 * Establish route to request scraped data
 */
app.get('/scraper', createLocalsObj, scraperController.getMediumData, scraperController.getRedditData, frequencyController.sanitizeTitles);
app.get('/frequency', frequencyController.sanitizeTitles);


/**
 * Establish db connection
 */
const port = 8080;
app.listen(port);
console.log(`Server running on port: ${port}`);