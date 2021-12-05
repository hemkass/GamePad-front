import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import CurrentWeek from "./Pages/currentWeek";
import LastMonth from "./Pages/LastMonth";
import Screenshot from "./Pages/screenshots";

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
  const ref = React.createRef();
  ref.current = [];
  const closeMenu = () => {
    setModal("hidden");
    document.removeEventListener("click", closeMenu);
  };

  const [modal, setModal] = useState("hidden");

  const handleClickOutside = (event) => {
    // if (ref.current.length > 0) {
    /* console.log("hey", ref.current); */
    let isElementReferenced = false;
    for (let i = 0; i < ref.current.length; i++) {
      if (ref.current[i].contains(event.target)) {
        isElementReferenced = true;
      }
    }
    if (!isElementReferenced) {
      document.addEventListener("click", closeMenu);
    }
  };

  return (
    <Router>
      <header>
        <Header
          modal={modal}
          setModal={setModal}
          ref={ref}
          handleClickOutside={handleClickOutside}
        />
      </header>

      <Routes>
        <Route
          path="/"
          element={<Home handleClickOutside={handleClickOutside} />}
          SideBar="sideBar"
        ></Route>
        <Route
          path="/this-week"
          element={<CurrentWeek handleClickOutside={handleClickOutside} />}
          SideBar="sideBar"
        ></Route>
        <Route
          SideBar="sideBar"
          path="/last-month"
          element={<LastMonth handleClickOutside={handleClickOutside} />}
        ></Route>
        <Route
          path={"/game-like-/:id"}
          element={<Tags handleClickOutside={handleClickOutside} />}
        ></Route>
        <Route
          path={"/game-like-/:id/screenshot"}
          element={<Screenshot handleClickOutside={handleClickOutside} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
