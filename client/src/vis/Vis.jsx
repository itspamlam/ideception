import React from 'react';
import WordCloud from 'react-d3-cloud';

const calcFreq = (arr) => {
  let freqData = {};
  arr.map(word => {
    if (!freqData[word]) freqData[word] = 0;
    freqData[word] += 1;
    return word;
  });
  return Object.keys(freqData).filter(key => freqData[key] > 1).map(key => ({ 'text': key, value: freqData[key] }));
};

const fontSizeMapper = word => Math.log2(word.value) * 20;
const rotate = word => word.value % 360;

const fetchedData = ["crash", "course", "serverless", "withnodejs", "jquery", "selectors", "css", "selectors", "basics", "theywork", "your", "react", "app", "program", "variable", "javascript", "structure", "components", "inreact", "javascript", "libraries", "inchina", "tltr", "redux", "javascriptjourney", "promisedl", "i'm", "breaking", "higher", "order", "components", "object", "composition", "javascript", "angular", "reference", "angularj", "directive", "react", "developers", "lovenode", "react", "rendering", "part", "rise", "extj", "prop", "easily", "react", "proptypes", "reliable", "browser", "selenium", "nodejs", "time", "web", "re", "person", "javascript", "knownode", "quick", "introduction", "functional", "javascript", "dashboard", "your", "grill", "arduino", "react", "web", "development", "iti", "reactiveconf", "js", "screwdriver", "your", "favoritehammer", "future", "ofdevtools", "tetri", "game", "veubeke", "less", "byte", "html", "javascript", "javascript", "gooey", "amoeba", "animation", "with", "download", "stats", "github", "react", "sight", "tool", "react", "applications", "component", "typescript", "onsite", "assignment", "dev", "contractors", "tagselector", "field", "tag", "your", "webpack", "bundles", "time", "keep", "track", "production", "analysis", "dashboard", "javascript", "concept", "course", "object", "oriented", "programming", "javascript", "version", "javascript", "feature", "here's", "y", "pipe", "heroku", "aws", "cloudwatch", "graphql", "codegen", "the", "graphql", "platm", "arrow", "functions", "javascript", "javascript", "beginners", "the", "wayback", "machine", "loading", "animation", "reloading", "chrome", "extensions", "webpack", "example", "pattern", "architecture", "fullstack", "fest", "frontend", "days", "personal", "highlights", "speech", "recognition", "api", "implementation", "easter", "egg", "halloween", "your", "hosts", "then", "zip", "server"];

const Vis = (props) => {
  let data = calcFreq(fetchedData);
  return (
    <div className="Vis">
      <WordCloud
        data={data}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
      />
    </div>
  );
};

export default Vis;