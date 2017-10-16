import React from 'react';

const Idea = (props) => {

  const titles = [];

  // grab all the titles in the database
  props.ideas.forEach( (ideaObj, index) => {
    titles.push(<li key = {index}>{ideaObj.title}</li>);
  });

  return (
    <div style={{'marginLeft':'5% !important'}}>
      <h3>Saved Ideas: </h3>
      <ul style={{'listStyle':'none', 'marginLeft':'0 !important'}}>{titles}</ul>
    </div>
  )
}

export default Idea;
