import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SideBar from "../components/SideBar";

const Home = ({ handleClickOutside }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [ordering, setOrdering] = useState("added");
  const [platform, setPlatform] = useState("");
  const [getPlatform, setGetPlatform] = useState(1);

  const handleClick = (elem) => {
    setId(elem);
    /*  console.log("mes screen", elem.short_screenshots); */
    //navigate(`/game-like-/${elem.id}`)
    navigate(`/game-like-/${elem.id}`, {
      state: { screenshot: elem.short_screenshots, name: elem.name },
    });
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
  /* console.log(nextXdays); */

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4000/games?ordering=${ordering}&dates=${nextXdays}&parent_platforms=${getPlatform}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [ordering, getPlatform]);
  /*  GetMonday permet de renvoyer la semaine actuelle du lundi au dimanche. */
  /* console.log(data); */

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:4000/platform/list`);
      /*  console.log(response.data); */
      setPlatform(response.data);
    };

    fetchData();
  }, []);
  /*  GetMonday permet de renvoyer la semaine actuelle du lundi au dimanche.
   console.log("hello", getPlatform); */

  const mouseEnter = (elem) => {
    //console.log("mon id", document.getElementById(`box${elem.id}`));
    document.getElementById(`roll${elem.id}`).className = "roll";
    document.getElementById(`box${elem.id}`).className = "bigger";
  };

  const mouseLeave = (elem) => {
    document.getElementById(`roll${elem.id}`).className = "hidden";
    document.getElementById(`box${elem.id}`).className = "box";
  };

  return isLoading ? (
    <div>en chargement</div>
  ) : (
    <div className="homecontent" onClick={handleClickOutside}>
      <div className="sideBar">
        <SideBar />
      </div>
      <div className="mainContent">
        <div>
          <h1>New and trending</h1>
        </div>
        <div>
          <p>Based on player counts and release date</p>
        </div>
        <div className="ordering">
          <span className="padding">
            <select
              className="select"
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
          </span>
          <span>
            <select
              className="select"
              value={getPlatform}
              onChange={(event) => {
                setGetPlatform(event.target.value);
              }}
            >
              {platform.results.map((elem, index) => {
                return (
                  <option key={index} value={elem.id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
          </span>
        </div>

        <div className="section">
          {data.results.map((elem, index) => {
            //console.log("mon id", `box${elem.id}`);
            return (
              <div key={`box${elem.id}`}>
                <div
                  id={`box${elem.id}`}
                  className="box"
                  onMouseEnter={() => {
                    mouseEnter(elem);
                  }}
                  onMouseLeave={() => {
                    mouseLeave(elem);
                  }}
                >
                  {" "}
                  {elem.background_image && (
                    <div>
                      <img
                        src={elem.background_image}
                        alt="illustrative du jeu"
                      ></img>
                    </div>
                  )}
                  <div className="details">
                    <span className="metaBox">
                      {elem.parent_platforms && (
                        <span>
                          {elem.parent_platforms.map((item, index) => {
                            return (
                              <span key={index}>
                                {item.platform.name === "PC" ? (
                                  <FontAwesomeIcon
                                    className="iconPlateform"
                                    icon={["fas", "desktop"]}
                                  />
                                ) : item.platform.name === "PlayStation" ? (
                                  <FontAwesomeIcon
                                    span
                                    className="iconPlateform"
                                    icon={["fas", "gamepad"]}
                                  />
                                ) : (
                                  item.platform.name
                                )}
                              </span>
                            );
                          })}
                        </span>
                      )}
                      {elem.metacritic && (
                        <span
                          className={`meta ${
                            elem.metacritic >= 70 ? "green" : "orange"
                          }  `}
                        >
                          {elem.metacritic}
                        </span>
                      )}
                    </span>

                    <div className="gameName">
                      <h2>{elem.name}</h2>
                    </div>
                    <div id={`roll${elem.id}`} className="hidden">
                      <div className="releaseDate">
                        <span className="RoleText">Release Date :</span>
                        <span className="RollValue">{elem.released}</span>
                      </div>
                      <div>
                        <span className="genres">
                          <span>Genres</span>
                          <span>
                            {elem.genres.map((genre, index) => {
                              return (
                                <span key={index}>
                                  {index === elem.genres.length - 1 ? (
                                    <span className="RollValue">{`${genre.name}`}</span>
                                  ) : (
                                    <span className="RollValue">{`${genre.name},`}</span>
                                  )}
                                </span>
                              );
                            })}
                          </span>
                        </span>
                      </div>
                      <div className="ShowMore">
                        <button
                          className="rollButton"
                          onClick={() => {
                            handleClick(elem);
                          }}
                        >
                          {/*  {console.log(id)} */}
                          Show more like this
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
