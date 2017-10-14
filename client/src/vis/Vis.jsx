import React from 'react';
// Reqiuired module for generating wordcloud
import WordCloud from './../lib/react-d3-cloud/WordCloud';

/**
 * fontSizeMapper - generates font size for particular word in wordcloud
 * 
 * @param {string} word
 */
const fontSizeMapper = word => Math.log2(word.value) * 20;

/**
 * rotate - generates rotation prop for particular word in wordcloud
 * 
 * @param {string} word 
 */
const rotate = word => word.value % 360;


const Vis = (props) => {
  // initialize variables
  let data,
    filteredData;
  
  if(props.scrapedWords && Object.keys(props.freqData).length > 0){ // only start logic if we're finished fetching and analyzing scraped data
    // set filteredData to array of objects where text prop is the key of freqData and the value is the number of occurrances.  
    //    Filterd to only show frequencies greater than 1 and non-generic text.
    filteredData = props.freqData ? Object.keys(props.freqData).filter(key => (key !== 'your' && key !== 'my' && key !== 'the' && props.freqData[key] > 1)).map(key => ({ 'text': key, value: props.freqData[key] })) : null;
    if(!props.randomWords || !props.randomWords.length) { // now, if there are no random words, request to fetch those using frequency and filtered data
      let len = Object.values(props.freqData).length;
      let count = Object.values(props.freqData).sort((a,b) => a-b)[len - 1];
      let max = Math.floor(filteredData.length / 4);
      props.getRandomWords(count, max);
    }
    else data = filteredData.concat(props.randomWords); // otherwise, set the final data variable to array including all manipulated data.
  }
  return (
    <div className="Vis">
      {data ? <WordCloud
        data={data}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
        clickEvent={props.handleClickedWord}
      /> : null}
    </div>
  );
};

export default Vis;

/**
 * TEST DATA
 */
// const fetchedData = ["crash", "course", "serverless", "withnodejs", "jquery", "selectors", "css", "selectors", "basics", "theywork", "your", "react", "app", "program", "variable", "javascript", "structure", "components", "inreact", "javascript", "libraries", "inchina", "tltr", "redux", "javascriptjourney", "promisedl", "i'm", "breaking", "higher", "order", "components", "object", "composition", "javascript", "angular", "reference", "angularj", "directive", "react", "developers", "lovenode", "react", "rendering", "part", "rise", "extj", "prop", "easily", "react", "proptypes", "reliable", "browser", "selenium", "nodejs", "time", "web", "re", "person", "javascript", "knownode", "quick", "introduction", "functional", "javascript", "dashboard", "your", "grill", "arduino", "react", "web", "development", "iti", "reactiveconf", "js", "screwdriver", "your", "favoritehammer", "future", "ofdevtools", "tetri", "game", "veubeke", "less", "byte", "html", "javascript", "javascript", "gooey", "amoeba", "animation", "with", "download", "stats", "github", "react", "sight", "tool", "react", "applications", "component", "typescript", "onsite", "assignment", "dev", "contractors", "tagselector", "field", "tag", "your", "webpack", "bundles", "time", "keep", "track", "production", "analysis", "dashboard", "javascript", "concept", "course", "object", "oriented", "programming", "javascript", "version", "javascript", "feature", "here's", "y", "pipe", "heroku", "aws", "cloudwatch", "graphql", "codegen", "the", "graphql", "platm", "arrow", "functions", "javascript", "javascript", "beginners", "the", "wayback", "machine", "loading", "animation", "reloading", "chrome", "extensions", "webpack", "example", "pattern", "architecture", "fullstack", "fest", "frontend", "days", "personal", "highlights", "speech", "recognition", "api", "implementation", "easter", "egg", "halloween", "your", "hosts", "then", "zip", "server"];