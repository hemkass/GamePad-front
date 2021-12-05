import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SideBar from "../components/SideBar";

const LastMonth = ({ handleClickOutside }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [ordering, setOrdering] = useState("added");
  const [platform, setPlatform] = useState("");
  const [getPlatform, setGetPlatform] = useState(1);

  const handleClick = (elem) => {
    setId(elem);
    navigate(`/game-like-/${elem.id}`);
  };

  // fonction pour calculer les 30 derniers jours
  const getLastMonth = () => {
    let Todaydate = new Date();

    Todaydate =
      Todaydate.getFullYear() +
      "-" +
      (Todaydate.getMonth() + 1 >= 10
        ? Todaydate.getMonth() + 1
        : "0" + (Todaydate.getMonth() + 1)) +
      "-" +
      (Todaydate.getDate() >= 10
        ? Todaydate.getDate()
        : "0" + Todaydate.getDate());

    let date = new Date();
    date =
      date.getFullYear() +
      "-" +
      (date.getMonth() >= 10 ? date.getMonth() : "0" + (date.getMonth() + 1)) +
      "-" +
      (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate());

    let dates = `${date},${Todaydate}`;
    return dates;
  };

  let last30days = getLastMonth();
  console.log(last30days);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4000/games?ordering=${ordering}&parent_platforms=${getPlatform}&dates=${last30days}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [ordering, getPlatform]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:4000/platform/list`);
      /* console.log(response.data); */
      setPlatform(response.data);
    };

    fetchData();
  }, []);

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
          <h1>New This WEEK</h1>
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
                {elem.background_image && (
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
                    <div>
                      <img
                        src={elem.background_image}
                        alt="illustrative du jeu"
                      ></img>
                    </div>
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
                )}
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default LastMonth;
