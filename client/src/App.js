import React, { Component } from 'react';
import Vis from './vis/Vis';
import VisLoading from './vis/VisLoading';
import VisError from './vis/VisError';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      scrapedWords: this.getScrapedWords(),
      randomWords: [],
      freqData: {},
      visLoading: true,
      visError: false
    };
    
    this.calcFreq = this.calcFreq.bind(this);
    this.getRandomWords = this.getRandomWords.bind(this);
    this.getScrapedWords = this.getScrapedWords.bind(this);
  }

  getScrapedWords() {
    fetch('http://localhost:8080/scraper')
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

  getRandomWords(count = 10, max = 10) {
    fetch(`http://localhost:8080/faker?count=${count}&max=${max}`)
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.visLoading ? <VisLoading /> : null}
        {this.state.visError ? <VisError /> : null}
        {this.state.scrapedWords && this.state.freqData && !this.state.visError ? <Vis 
          freqData={this.state.freqData}
          randomWords={this.state.randomWords} 
          scrapedWords={this.state.scrapedWords}
          getRandomWords={this.getRandomWords}
        /> : null}
      </div>
    );
  }
}

export default App;
