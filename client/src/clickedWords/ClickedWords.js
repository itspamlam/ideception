import React from 'react';

const ClickedWords = (props) => {

//REVERSE and MAP//
  // let revWords = props.clickedWords.reverse()
  // let words = revWords.map((x, i) => {
  //    return <li id = {i}>{revWords[i]}</li>
  // })

//FOR LOOP//
  let words2 = []
  for (let i = props.clickedWords.length-1; i >= 0; i -= 1){
    words2.push(<li>{props.clickedWords[i]}</li>);    
  }
  
  return (
    <div>
      <h3> Current Score: </h3>
      { words2.length }
      <h3>Target Word: </h3>
      {props.targetWord}
      <h3>Clicked Words: </h3>
       {words2}
    </div>
  )
}

export default ClickedWords;