'use strict';
// Required packages
const nlp = require('compromise');
// Define controller to export
const frequencyController = {};
// Test data
const titlesArr = [
  "A crash course on Serverless with Node.js",
  "How to fix your React app when it secretly hates you",
  "How to use jQuery Selectors and CSS Selectors, and the basics of how they work",
  "I’m Breaking up with Higher Order Components.",
  "Object Composition in Javascript",
  "Mimicking Angular template references in AngularJS with a 10-line directive",
  "Why React Developers LOVE Node",
  "Optimizing React Rendering (Part 2)",
  "The rise and fall of Ext JS",
  "Validating Props easily with React PropTypes",
  "How to write reliable browser tests using Selenium and Node.js",
  "It’s time to kill the web",
  "Is there any value in people who cannot write JavaScript?",
  "You don’t know Node",
  "A Quick Introduction to Functional Javascript",
  "How to build a dashboard for your grill using Arduino and React",
  "Front-end web development is not what you think it is.",
  "Why I will not be speaking at ReactiveConf",
  "CSS in JS is like replacing a broken screwdriver with your favorite hammer.",
  "Prototyping the Future of DevTools",
  "A React And Preact Progressive Web App Performance Case Study: Treebo",
  "JavaScript Monads Made Simple",
  "3 Code Splitting Patterns For VueJS and Webpack",
  "How to write robust apps every time, using “The Clean Architecture”",
  "Learn How To Debug JavaScript with Chrome DevTools",
  "React Sight - a tool that shows you a React application's component hierarchy",
  "Announcing TypeScript 2.6 RC",
  "This on-site coding assignment failed 20+ front-end dev contractors and I don't know why",
  "Monitor your webpack bundles over time! Keep track of production builds with analysis dashboard",
  "What JavaScript/programming concepts do you/have you found most difficult to learn?",
  "Arrow Functions in JavaScript",
  "GraphQL Code-Gen 1.0: The true GraphQL first platform",
  "Designing The Wayback Machine Loading Animation",
  "Javascript for beginners",
  "Working examples JS patterns/architecture",
  "If / Then statement issues",
  "How to provide .zip files without thrashing the server?",
  "8 JavaScript optimizations Closure Compiler can do conventional minifiers just can’t",
  "WebGL 2.0 : 047 : Ray intersects Bounding Box (OBB)",
  "Cross origin iframe environments",
  "Building desktop apps with Angular, Electron and Sqlite",
  "Looking at Tree-Shaking in JavaScript with Rollup",
  "Popup window pops under pictures",
  "JavaScript Functions That Define and Rewrite Themselves",
  "Eloquent Javascript 3rd Edition",
  "Debounce Your React Code To Improve Performance",
  "Comet - Automatically Generate Style Guides for Your React Apps",
  "Framework war in my work environment.",
  "Is it bad to put calculations in the return statement?",
  "Which component should get state in React? – Felix Clack – Medium"
];

/**
 * sanitizeTitles - iterates through titles in either req.locals.titles or the test titles arr
 * removes special characters and generic words
 * outputs sanitize word array
 */
frequencyController.sanitizeTitles = (req, res, next) => {
  let titles = req.locals ? req.locals.titles : titlesArr;
  let sanitizedWords = [];

  for(let i = 0; i < titles.length; i++){
    // remove non alphanumeric characters
    let title = titles[i].replace(/\//g, " ");
        title = title.replace(/[^a-zA-Z’ ]/g, "");
        title = title.replace('and', '');
        title = title.replace('for', '');
        title = title.replace('the', '');
    let doc = nlp(title);
    doc.nouns().data().forEach(noun => {
      let words = noun.singular.split(' ');
      sanitizedWords = sanitizedWords.concat(words);
    });
  }

  res.status(200).send(sanitizedWords);
};

module.exports = frequencyController;