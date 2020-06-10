import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Content from "./services/Content";
import { AuthProvider } from "./services/Auth";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Content />
      </Router>
    </AuthProvider>
  );
}

export default App;