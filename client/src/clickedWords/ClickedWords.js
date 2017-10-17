import React from 'react';

const ClickedWords = (props) => {
  let revWords = props.clickedWords.reverse()
  let words = revWords.map((x, i) => {
     return <li id = {i}>{revWords[i]}</li>
  })

  //FOR LOOP//
  // for (let i = clickedWords.length - 1; i >= 0; i += 1){
  //      return <li id = {i}>{clickedWords[i]}</li>
  // } 
 
  return (
    <div>
      <h3> Current Score: </h3>
      { words.length }
      <h3>Target Word: </h3>
      {props.targetWord}
      <h3>Clicked Words: </h3>
       {words}
    </div>
  )
}

export default ClickedWords;
