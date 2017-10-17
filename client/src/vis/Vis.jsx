import React from 'react';
// Reqiuired module for generating wordcloud
import WordCloud from './../lib/react-d3-cloud/WordCloud';

/**
 * fontSizeMapper - generates font size for particular word in wordcloud
 *
 * @param {string} word
 */
const fontSizeMapper = word => Math.log2(word.value) * 20;

/**
 * rotate - generates rotation prop for particular word in wordcloud
 *
 * @param {string} word
 */
const rotate = word => word.value % 360;


const Vis = (props) => {
  return (
    <div className="Vis">
      {props.scrapedWords.length ? <WordCloud
        width={500}
        height={500}
        data={props.scrapedWords}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
        clickEvent={props.handleClickedWord}
      /> : null}
    </div>
  );
};

export default Vis;
