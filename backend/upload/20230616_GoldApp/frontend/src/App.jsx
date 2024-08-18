import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./pages/Home/Home.jsx";
import UpdateLocal from "./pages/localRatesUpdate/LocalRatesUpdate.jsx";
import Header from "./component/Header/Header.jsx";
import Calculator from "./pages/GoldCalculator/Calculator.jsx";
import SilverCalculator from "./pages/SilverCalculator/SilverCalculator.jsx";
import TradingGuide from "./pages/TradingGuide/TradingGuide.jsx";
import Graph from "./pages/Graph/Graph.jsx";
import Auth from "./auth/Auth.jsx";

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka", "Noto Nastaliq Urdu"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminupdate" element={<UpdateLocal />} />
        <Route path="/calculateMetals" element={<Calculator />} />
        <Route path="/calculatesilver" element={<SilverCalculator />} />
        <Route path="/trading" element={<TradingGuide />} />
        <Route path="/goldHistory" element={<Graph />} />
        <Route path="/login" element={<Auth />} />

        <Route path="*" element={<h1>Error 404 NOT FOUND</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
