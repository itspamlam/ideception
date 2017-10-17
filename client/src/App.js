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
      scrapedWords: [],
      visLoading: true,
      visError: false,
      // New idea component
      newIdea: {
        title: "",
        idea: "",
        tag: ""
      },
      // Saved ideas component
<<<<<<< HEAD
      ideas: this.getIdea(),
      windowWidth: 0,
      windowHeight: 0
=======
      ideas: []
>>>>>>> d7a81ee205066847412f781ff347c45459e11164
    };

    this.clickedWords = ['javascript'];

    this.getWords = this.getWords.bind(this);
    // Vis interaction method
    this.handleClickedWord = this.handleClickedWord.bind(this);
    //New Idea methods
    this.handleNewIdeaFieldUpdate = this.handleNewIdeaFieldUpdate.bind(this);
    // get Idea method
    this.getIdea = this.getIdea.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    // window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    console.log('hello');
    this.setState({
      windowWidth: window.innerWidth,
      height: window.innerHeight
    });
  }


  /**
   * getScrapedWords - fetches data from datamuse API
   */
<<<<<<< HEAD
  getScrapedWords() {
    fetch('http://localhost:8080/api/scraper')
      .then((response) => response.json())
      .then(scrapedWords => {
        // setTimeout(() => this.calcFreq(), 100);
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
=======
  componentDidMount() {
    this.getWords();
    this.getIdea();
>>>>>>> d7a81ee205066847412f781ff347c45459e11164
  }

  getWords() {
    console.log(this.clickedWords);
    fetch('http://localhost:8080/api/scraper?word=' + this.clickedWords.slice(-1))
      .then((response) => response.json())
      .then(scrapedWords => {
        console.log(scrapedWords);
        this.setState({
          scrapedWords: scrapedWords,
          visLoading: false
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

<<<<<<< HEAD
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
=======
>>>>>>> d7a81ee205066847412f781ff347c45459e11164

  /**
   * handleClickedWord - updates clickedWords cache obj based on user clicks. To be used later by NewIdea to auto-add tags
   *  - if word does not exist in cache, adds word with value of true
   *  - if word exists, deletes word from cache
   *
   * @param {obj} item
   */
  handleClickedWord(item) {
    let word = item.text;
    this.clickedWords.push(word)
    this.getWords();
  }

  /**
  * getIdea - fetch Idea DB for title, idea, and tag
  */
  getIdea() {
    fetch('http://localhost:8080/api/ideas')
      .then((response) => response.json())
      .then(gotIdea => {
        console.log(gotIdea);
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
          <small>Brought to you by Databasiqs <em> - cause you're querious!</em></small>
        </header>
        <div className="visual">
          {/* VIS RENDER LOGIC */}
          {this.state.visLoading ? <VisLoading /> : null}
          {this.state.visError ? <VisError /> : null}
          {this.state.scrapedWords && !this.state.visError ? <Vis
            scrapedWords={this.state.scrapedWords}
            handleClickedWord={this.handleClickedWord}
            windowWidth={this.state.windowWidth}
            windowHeight={this.state.windowHeight}
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
