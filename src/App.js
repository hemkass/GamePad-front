import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import CurrentWeek from "./Pages/currentWeek";
import LastMonth from "./Pages/LastMonth";

import Header from "./components/Header";
import Tags from "./Pages/Tags";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faDesktop,
  faCloudUploadAlt,
  faEnvelope,
  faTimes,
  faHeart,
  faHeartBroken,
  faFireAlt,
  faStar,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faSearch,
  faGamepad,
  faDesktop,
  faEnvelope,
  faTimes,
  faHeart,
  faCloudUploadAlt,
  faHeartBroken,
  faFireAlt,
  faStar
);

function App() {
  return (
    <Router>
      <header>
        <Header />
      </header>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/this-week" element={<CurrentWeek />}></Route>
        <Route path="/last-month" element={<LastMonth />}></Route>
        <Route path={"/game-like-/:id"} element={<Tags />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
