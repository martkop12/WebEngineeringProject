import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Content from "./components/layout/Content";

function App() {
  return (
      <Router>
        <Content />
      </Router>
  );
}

export default App;
