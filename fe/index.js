import React from "react";
import ReactDOM from "react-dom";
import Veed from "./src/veed";

const App = () => {
  return (
    <React.Fragment>
      <Veed />
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("App"));
