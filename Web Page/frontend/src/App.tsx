import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecommendationPage from "./pages/RecommendationPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecommendationPage />} />
      </Routes>
    </Router>
  );
}

export default App;

