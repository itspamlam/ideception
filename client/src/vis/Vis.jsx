import React from 'react';
// Reqiuired module for generating wordcloud
import WordCloud from './../lib/react-d3-cloud/WordCloud';

/**
 * fontSizeMapper - generates font size for particular word in wordcloud
 *
 * @param {string} word
 */
const fontSizeMapper = word => Math.log2(word.value) * 40;

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
        width={props.windowDimensions.width - 260}
        height={props.windowDimensions.height - 60}
        data={props.scrapedWords}
        fontSizeMapper={fontSizeMapper}
        font="sans-serif"
        rotate={rotate}
        clickEvent={props.handleClickedWord}
      /> : null}
    </div>
  );
};

export default Vis;
