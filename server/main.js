const bodyParser    = require('body-parser'),
express       = require('express'),
router        = express.Router(),
path          = require('path'),
app           = express(),
db            = require('./models/database.js'),
userController= require('./controllers/userController.js');

/** Database Connection...located in database.js */
// console.log('This is the db', db.conn.connect);

/**
* Express middleware to serve all static files from client folder
*/
    //   express       = require('express'),
    //   path          = require('path'),
    //   app           = express();

/**
 * require controllers
 */
const fakerController = require('./controllers/fakerController.js');
const scraperController = require('./controllers/scraperController.js');
const frequencyController = require('./controllers/frequencyController.js');
const ideaController = require('./controllers/ideaController.js');
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

// app.use('/', router);

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
  * Database Query to create Idea table
  */
app.post('/', ideaController.createIdea);
app.get('/', ideaController.getIdea);

//use the express.Router() for any route after /
app.use('/', router);


/**
 * Establish route to controller middleware
 */

 router
    .route('/')
    .post(userController.createUser)
    .get(userController.getUser);
     
/**
 * Establish db connection
 */
const port = 8080;
app.listen(port);
console.log(`Server running on port: ${port}`);
