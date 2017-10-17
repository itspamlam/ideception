import React, { Component } from 'react';

class TargetWord extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="target-word-input">
        <h2>Enter your target word:</h2>
        <input onKeyUp={this.props.handleTargetInput}/>
      </div>
    );
  }
}

export default TargetWord;
