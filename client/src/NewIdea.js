import React from 'react';


const NewIdea = (props) => {
    //pass down update fields and saveIdea props

    return (
        <div id="container">
          <form className="NewIdea">
            <input id="title" name="title" type="text" placeholder="New Title"/>
            <input id="idea" name="idea" type="text" placeholder="New Idea"/>
            {/* tags */}
            <button type="submit" onClick={props.saveIdea}>SAVE</button>
          </form>
        </div>
    )


}


export default NewIdea;