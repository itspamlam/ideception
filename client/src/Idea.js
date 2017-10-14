import React, {Component} from 'react';

const Idea = (props) => {

  const titles = [];

  // grab all the titles in the database
  props.ideas.forEach( ideaObj => {
    titles.push(ideaObj.title);
  });

  console.log(titles);

  return (
    <div>
      <ul>
        {titles.map(title => {
          return <li>{title}</li>
        })}
      </ul>
    </div>
  )
}

export default Idea;
