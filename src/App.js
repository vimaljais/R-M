import { useContext } from "react";
import { Routes, Route, Link } from "react-router";

import "./App.css";

import ShowPage from "./pages/ShowPage";
import Home from "./pages/Home";

import { Store } from "./store";

const App = () => {
  const { state, dispatch } = useContext(Store);

  return (
    <div>
      <Routes>
        <Route path="/show" element={<ShowPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
