import React from 'react';

const Idea = (props) => {

  const titles = [];

  // grab all the titles in the database
  props.ideas.forEach( (ideaObj, index) => {
    titles.push(<li key = {index}>{ideaObj.title}</li>);
  });

  return (
    <div>
      <ul>{titles}</ul>
    </div>
  )
}

export default Idea;
