// import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameDetailPage from "./pages/GameDetailPage";
import GameReviews from "./pages/GameReviews";

import CardContainer from "./components/CardContainer";

//IMPORTANT:
// Use React v18 and react.dom v18 for compatibility problems between antd, react-hook-form and React
//Both v19 give problems with antd's radios and buttons
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CardContainer />} />
          <Route path="/game/:id" element={<GameDetailPage />} />
          <Route path="/game/reviews/:id" element={<GameReviews />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
