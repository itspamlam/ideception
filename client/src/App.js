import React, { Component } from 'react';
// Components for rendering wordcloud
import Vis from './vis/Vis';
import VisLoading from './vis/VisLoading';
import VisError from './vis/VisError';
// Idea component
import Idea from './ideas/Idea.js';
import NewIdea from './ideas/NewIdea.js';
// Style
import logo from './Ideception.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Vis state
      scrapedWords: this.getScrapedWords(),
      randomWords: [],
      freqData: {},
      visData: [],
      visLoading: true,
      visError: false,
      // Vis interaction
      clickedWords: {},
      // New idea component
      newIdea: {
        title: "",
        idea: "",
        tag: ""
      },
      // Saved ideas component
      ideas: this.getIdea()
    };

    // Vis methods
    this.calcFreq = this.calcFreq.bind(this);
    this.prepVisData = this.prepVisData.bind(this);
    this.getRandomWords = this.getRandomWords.bind(this);
    this.getScrapedWords = this.getScrapedWords.bind(this);
    // Vis interaction method
    this.handleClickedWord = this.handleClickedWord.bind(this);
    //New Idea methods
    this.handleNewIdeaFieldUpdate = this.handleNewIdeaFieldUpdate.bind(this);
    // get Idea method
    this.getIdea = this.getIdea.bind(this);
  }

  /**
   * getScrapedWords - fetches scraped data from server
   */
  getScrapedWords() {
    fetch('http://localhost:8080/api/scraper')
      .then((response) => response.json())
      .then(scrapedWords => {
        setTimeout(() => this.calcFreq(), 100);
        this.setState({
          scrapedWords: scrapedWords
        });
      })
      .catch(ex => {
        console.log('error getting scraped words', ex);
        this.setState({
          visError: true,
          visLoading: false
        });
      });
  }

  /**
   * getRandomWords - fetches random words and random frequency data from server
   *
   * @param {int} count = added to query string representing
   *    the number of random words server should return
   * @param {int} max = represents the max frequency which could be randomly
   *    generated in returned object
   */
  getRandomWords(count = 10, max = 10) {
    fetch(`http://localhost:8080/api/faker?count=${count}&max=${max}`)
      .then((response) => response.json())
      .then(randomWords => {
        setTimeout(this.prepVisData, 100);
        this.setState({
          randomWords: randomWords
        });
      })
      .catch(ex => {
        console.log('error getting random words', ex);
        this.setState({
          visError: true,
          visLoading: false
        });
      });
  }

  /**
   * calcFreq - calculates the frequency of word occurrences for
   *    scrapedWord items and updates state with frequency data obj
   */
  calcFreq() {
    let freqData = {};
    this.state.scrapedWords.map(word => {
      if (!freqData[word]) freqData[word] = 0;
      freqData[word] += 1;
      return word;
    });
    setTimeout(this.prepVisData, 100);
    this.setState({
      freqData: freqData
    });
  }

  /**
   * prepVisData - creates data array to be used by Vis component for rendering wordcloud
   *  - filters common words and only shows words with frequency > 1
   *  - concats scraped words and random words
   */
  prepVisData() {
    let freqData = Object.assign(this.state.freqData),
      randomWords = this.state.randomWords.length ? this.state.randomWords.slice(0) : null,
      visData;

    // set visData to array of objects where text prop is the key of freqData and the value is the number of occurrances.  
    //    Filterd to only show frequencies greater than 1 and non-generic text.
    visData = Object.keys(freqData)
      .filter(key => (key !== 'your' && key !== 'my' && key !== 'the' && freqData[key] > 1))
      .map(key => ({ 'text': key, value: freqData[key] }));
    if (!randomWords) { // now, if there are no random words, request to fetch those using frequency and filtered data
      let len = Object.values(freqData).length;
      let count = Object.values(freqData).sort((a, b) => a - b)[len - 1];
      let max = Math.floor(visData.length / 4);
      return this.getRandomWords(count, max);
    }
    else {  // otherwise, set the final data variable to array including all manipulated data.
      visData = visData.concat(randomWords);
      this.setState({
        visData: visData,
        visLoading: false
      });
    }
  }

  /**
   * handleClickedWord - updates clickedWords cache obj based on user clicks. To be used later by NewIdea to auto-add tags
   *  - if word does not exist in cache, adds word with value of true
   *  - if word exists, deletes word from cache
   * 
   * @param {obj} item 
   */
  handleClickedWord(item) {
    let word = item.text;
    let clickedWords = Object.assign(this.state.clickedWords);
    if (!clickedWords[word]) clickedWords[word] = true;
    else delete clickedWords[word];
    console.log('updating cache', clickedWords);
    this.setState({
      clickedWords: clickedWords
    });
  }

  /**
  * getIdea - fetch Idea DB for title, idea, and tag
  */
  getIdea() {
    fetch('http://localhost:8080/api/ideas')
      .then((response) => response.json())
      .then(gotIdea => {
        this.setState({
          ideas: gotIdea
        });
      })
      .catch(err => {
        console.log('error', err);
      });
  }

  /**
   * handleNewIdeaFieldUpdate - updates state any time new idea field changes
   * 
   * @param {obj} e - object provided by click event 
   */
  handleNewIdeaFieldUpdate(e) {
    let update = e.target.name; //The field that's updated is the property's name
    let newIdea = Object.assign(this.state.newIdea); //Creating a copy of the current state
    newIdea[update] = e.target.value; //Updating copy with new field data
    this.setState({ newIdea }) //Updating state wholly
  };

  // saveIdea(e){
  //   fetch to local server with the post method
  //   use the server to post user inputs to database

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          <small>Brought to you by Databasiqs <em> - cause you're querious!</em></small>
        </header>
        <div className="visual">
          {/* VIS RENDER LOGIC */}
          {this.state.visLoading ? <VisLoading /> : null}
          {this.state.visError ? <VisError /> : null}
          {this.state.visData && !this.state.visError ? <Vis
            visData={this.state.visData}
            handleClickedWord={this.handleClickedWord}
          /> : null}
        </div>
        <div className="ideas">
          <div>
            {/* NEW IDEA LOGIC */}
            <NewIdea
              handleNewIdeaFieldUpdate={this.state.handleNewIdeaFieldUpdate}
            />
          </div>
          <div>
            {/* SHOW IDEAS LOGIC */}
            {this.state.ideas ? <Idea ideas={this.state.ideas} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
