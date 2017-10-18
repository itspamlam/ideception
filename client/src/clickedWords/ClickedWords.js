import React from 'react';

const ClickedWords = (props) => {

//REVERSE and MAP//
  // let revWords = props.clickedWords.reverse()
  // let words = revWords.map((x, i) => {
  //    return <li id = {i}>{revWords[i]}</li>
  // })

//FOR LOOP//
  let words2 = []
  for (let i = props.clickedWords.length-1; i >= 0; i -= 1) {
    if (props.clickedWords[i] !== props.targetWord) {
      words2.push(<li key={i} className={props.clickedWords[i + 1] === props.targetWord ? 'finish-history': ''}>{props.clickedWords[i]}</li>);
    }
  }

  return (
    <div className="history-display">
      <h3 className="score">
        <span>Score:</span>
        { words2.length }
      </h3>

      <h3 className="target-word">
        {props.targetWord}
      </h3>
      <ul>
        {words2}
      </ul>
    </div>
  )
}

export default ClickedWords;
