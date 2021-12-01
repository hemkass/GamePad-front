import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SideBar from "../components/SideBar";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [ordering, setOrdering] = useState("added");
  const [boxStyle, setBoxStyle] = useState("roll");

  const handleClick = (elem) => {
    setId(elem);
    navigate(`/game-like-/${elem.id}`);
  };

  // Permet de n'afficher les jeux qui sortiront avant x mois ...
  const getNextMonth = (d, x) => {
    let Todaydate = new Date();

    Todaydate =
      Todaydate.getFullYear() +
      "-" +
      (Todaydate.getMonth() + 1) +
      "-" +
      Todaydate.getDate();

    d = new Date(d);
    var month = d.getMonth(),
      diff = 11 - month;
    if (x < diff) {
      d.setMonth(x);
    } else {
      d.setFullYear(d.getFullYear() + 1);
      d.setMonth(x - 1 - diff);
    }

    d =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
      "-" +
      (d.getDate() >= 10 ? d.getDate() : "0" + d.getDate());

    return `1960-01-01,${d}`;
  };

  let nextXdays = getNextMonth(new Date(), 3);
  console.log(nextXdays);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4000/games?ordering=${ordering}&dates=${nextXdays}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [ordering]);
  /*  GetMonday permet de renvoyer la semaine actuelle du lundi au dimanche. */
  console.log(data);
  return isLoading ? (
    <div>en chargement</div>
  ) : (
    <div className="homecontent">
      <div className="sideBar">
        <SideBar />
      </div>
      <div className="mainContent">
        <h1>New and trending</h1>
        <p>Based on player counts and release date</p>

        <select
          value={ordering}
          onChange={(event) => {
            setOrdering(event.target.value);
          }}
        >
          <option value="relevance">Relevance</option>
          <option value="added">Date added</option>
          <option value="name">Name</option>

          <option value="-released">Release date</option>
          {/*  <option value="Popularity">Popularity</option> */}
          <option value="-rating">Average Rating</option>
        </select>

        <div className="section">
          {data.results.map((elem, index) => {
            return (
              elem.background_image && (
                <div className="box" key={index}>
                  <div>
                    <img
                      src={elem.background_image}
                      alt="illustrative du jeu"
                    ></img>
                  </div>
                  <div className="details">
                    {elem.parent_platforms &&
                      elem.parent_platforms.map((item, index) => {
                        if (item.platform.name === "PC") {
                          return (
                            <FontAwesomeIcon
                              className="iconPlateform"
                              icon={["fas", "desktop"]}
                            />
                          );
                        }
                        if (item.platform.name === "PlayStation") {
                          return (
                            <FontAwesomeIcon
                              className="iconPlateform"
                              icon={["fas", "gamepad"]}
                            />
                          );
                        }
                        return (
                          <span key={index} className="iconPlateform">
                            {item.platform.name}
                          </span>
                        );
                      })}
                    <div className="gameName">
                      <h2>{elem.name}</h2>
                    </div>
                    <div className={boxStyle}>
                      <div className="releaseDate">
                        <span className="RoleText">Release Date :</span>
                        <span className="RollValue">{elem.released}</span>
                      </div>
                      <div>
                        <span className="genres">
                          <span>Genres</span>
                          {elem.genres.map((genre, index) => {
                            return (
                              <span key={index}>
                                <span className="RollValue">{genre.name}</span>
                              </span>
                            );
                          })}
                        </span>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            handleClick(elem);
                          }}
                        >
                          {console.log(id)}
                          Show more like this
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
