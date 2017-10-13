const bodyParser    = require('body-parser'),
      express       = require('express'),
      path          = require('path'),
      app           = express();

/**
 * require controllers
 */
const fakerController = require('./controllers/fakerController.js');
const scraperController = require('./controllers/scraperController.js');
const frequencyController = require('./controllers/frequencyController.js');
/**
 * Create middleware function for scraper controller to add locals object to request for adding data
 */
const createLocalsObj = (req, res, next) => {
  req.locals = {};
  next();
};
// Add createLocalsObj as middleware
app.use(createLocalsObj);

/**
 * allowCrossDomain - Sets headers to allow for CORS
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
// Add allowCrossDomain as middleware
app.use(allowCrossDomain);

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
app.get('/scraper', scraperController.getMediumData, scraperController.getRedditData, frequencyController.sanitizeTitles);
// Test route for data not scraped
app.get('/frequency-test', frequencyController.sanitizeTitles);
app.get('/faker', fakerController.generateRandomWords, fakerController.generateRandomFrequencies);


/**
 * Establish db connection
 */
const port = 8080;
app.listen(port);
console.log(`Server running on port: ${port}`);