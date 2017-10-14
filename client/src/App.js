import React, { Component } from 'react';
// Components for rendering wordcloud
import Vis from './vis/Vis';
import VisLoading from './vis/VisLoading';
import VisError from './vis/VisError';
// Default create-react-app
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      // Vis state
      scrapedWords: this.getScrapedWords(),
      randomWords: [],
      freqData: {},
      visLoading: true,
      visError: false,
      // Vis interaction
      clickedWords: {}
    };
    
    // Vis methods
    this.calcFreq = this.calcFreq.bind(this);
    this.getRandomWords = this.getRandomWords.bind(this);
    this.getScrapedWords = this.getScrapedWords.bind(this);
    // Vis interaction method
    this.handleClickedWord = this.handleClickedWord.bind(this);
  }

  /**
   * getScrapedWords - fetches scraped data from server
   */
  getScrapedWords() {
    fetch('http://localhost:8080/api/frequency-test')
    .then((response) => response.json())
    .then(scrapedWords => {
      setTimeout(() => this.calcFreq(), 100);
      this.setState({
        scrapedWords:scrapedWords
      });
    })
    .catch(ex => {
      console.log('error getting scraped words', ex);
      this.setState({
        visError:true,
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
      this.setState({
        randomWords:randomWords,
        visLoading: false
      });
    })
    .catch(ex => {
      console.log('error getting random words', ex);
      this.setState({
        visError:true,
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
    this.setState({
      freqData:freqData
    });
  }

  handleClickedWord(item) {
    let word = item.text;
    let clickedWords = Object.assign(this.state.clickedWords);
    if(!clickedWords[word]) clickedWords[word] = true;
    else clickedWords[word] = false;
    this.setState({
      clickedWords: clickedWords
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* VIS RENDER LOGIC */}
        {this.state.visLoading ? <VisLoading /> : null}
        {this.state.visError ? <VisError /> : null}
        {this.state.scrapedWords && this.state.freqData && !this.state.visError ? <Vis 
          freqData={this.state.freqData}
          randomWords={this.state.randomWords} 
          scrapedWords={this.state.scrapedWords}
          getRandomWords={this.getRandomWords}
          handleClickedWord={this.handleClickedWord}
        /> : null}
      </div>
    );
  }
}

export default App;
