import * as React from 'react';

function ControlPanel(props) {
  const {year} = props;

  return (
    <div className="control-panel">
      <h3>Sentiment score in Australia</h3>
      <p>
        Map showing the Sentiment score income by state in year <b>{year}</b>. 
      </p>
      <p>Hover over a state to see details.</p>
      <div className="source-link">
        <a
          href="https://github.com/Toraycaaa/CCC_Assignment_2"
          target="_new"
        >
          View Source Code ↗
        </a>
      </div>
      <hr />

      <div key={'year'} className="input">
      <p>Year</p>
        <input
          className="m-input"
          type="range"
          value={year}
          min={2019}
          max={2021}
          step={1}
          onChange={evt => props.onChange(evt.target.value)}
        />
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);