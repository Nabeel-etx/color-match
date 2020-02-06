import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [initial, setinitial] = useState(true);

  const clickHandler = () => {
    setinitial(state => !state);
    setTimeout(() => setinitial(state => !state), 1000);
  };

  const array = [1, 2, 3, 1, 2, 3];
  const utils = {
    // create an array of numbers between min and max (edges included)
    range: (min, max) =>
      Array.from({ length: max - min + 1 }, (_, i) => min + i)
  };
  const color = {
    1: "lightgreen",
    2: "lightred",
    3: "lightorange"
  };
  const Divs = props => (
    <div
      className="inner"
      style={{ backgroundColor: initial ? "lightgrey" : "lightgreen" }}
      onClick={clickHandler}
    >
      {props.number}
    </div>
  );
  // const items = array.map((number, key) =>
  //   <div key={number}></div>
  // );

  return (
    <div className="App">
      <div className="outer">
        {/* <div className="inner" style={{backgroundColor: initial ? 'lightgrey' : 'lightgreen'}} onClick={clickHandler}></div> */}
        {utils.range(1, 6).map(items => (
          <Divs number={items} key={items} />
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
