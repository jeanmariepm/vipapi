import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";

import Veed from "./src/veed";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" render={(props) => <Veed {...props} />} />;
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("App"));
