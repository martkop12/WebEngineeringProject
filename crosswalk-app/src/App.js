import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Content from "./components/layout/Content";
import { AuthProvider } from "./Auth";


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
