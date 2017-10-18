import React from 'react';

const VisWinner = (props) => {
  return(
    <div className="VisWinner">
      <p>Yay! You Win!</p>
      <img src="https://media.giphy.com/media/d8ilc8qcW4lG0/giphy.gif"></img>
      <button type="submit" onClick={() => window.location.reload()}>Play Again?</button>
    </div>
  );
};

export default VisWinner;