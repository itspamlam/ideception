import React, { Component } from 'react';
// Components for rendering wordcloud
import Vis from './vis/Vis';
import VisLoading from './vis/VisLoading';
import VisError from './vis/VisError';
import VisWinner from './vis/VisWinner';
// Idea component
import Idea from './ideas/Idea.js';
import NewIdea from './ideas/NewIdea.js';
import ClickedWords from './clickedWords/ClickedWords'
import TargetWord from './target/targetWordOverlay'
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
      windowDimensions: {
        width: 500,
        height: 500
      },
      // Saved ideas component
      ideas: [],
      targetWord: '',
      clickedWords: ['javascript']
    };

    // this.clickedWords = ['javascript'];

    this.getWords = this.getWords.bind(this);
    // Vis interaction method
    this.handleClickedWord = this.handleClickedWord.bind(this);
    //New Idea methods
    this.handleNewIdeaFieldUpdate = this.handleNewIdeaFieldUpdate.bind(this);
    // get Idea method
    this.getIdea = this.getIdea.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleTargetInput = this.handleTargetInput.bind(this);
  }

  updateWindowDimensions() {
    this.setState({
      windowDimensions: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  }

  handleTargetInput(e) {
    if (e.keyCode === 13) {
      this.setState({
        targetWord: e.target.value
      })
    }
  }


  /**
   * getScrapedWords - fetches data from datamuse API
   */
  componentDidMount() {
    this.getWords();
    this.getIdea();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  getWords() {
    console.log(this.state.clickedWords);
    fetch('http://localhost:8080/api/scraper?word=' + this.state.clickedWords.slice(-1))
      .then((response) => response.json())
      .then(scrapedWords => {
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


  /**
   * handleClickedWord - updates clickedWords cache obj based on user clicks. To be used later by NewIdea to auto-add tags
   *  - if word does not exist in cache, adds word with value of true
   *  - if word exists, deletes word from cache
   *
   * @param {obj} item
   */
  handleClickedWord(item) {
    const word = item.text;
    // this.state.clickedWords.push(word)
    let newState = { clickedWords: this.state.clickedWords.concat(word) };
    if (newState.clickedWords.includes(this.state.targetWord)) {
      newState = { ...newState, isWinner: true };
    }
    this.setState(newState);
    setTimeout(this.getWords, 0);
    // this.getWords();
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
          <div className="App-logo">6&#176;.js</div>
          <small>Brought to you by Databasiqs <em> - cause you're querious!</em></small>
        </header>
        <div className={this.state.targetWord.length ? 'target-word-overlay' : 'target-word-overlay show-target-overlay'} >
          <TargetWord handleTargetInput={this.handleTargetInput} />
        </div>
        <div className="visual">
          {/* VIS RENDER LOGIC */}
          {this.state.visLoading ? <VisLoading /> : null}
          {this.state.visError ? <VisError /> : null}
          {this.state.isWinner ? <VisWinner /> : null}
          {this.state.scrapedWords && !this.state.visError && !this.state.isWinner ? <Vis
            scrapedWords={this.state.scrapedWords}
            handleClickedWord={this.handleClickedWord}
            windowDimensions={this.state.windowDimensions}
            clickedWords={this.state.clickedWords}
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
            <ClickedWords clickedWords={this.state.clickedWords} targetWord={this.state.targetWord}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
