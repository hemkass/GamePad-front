import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SideBar from "../components/SideBar";

const CurrentWeek = ({ handleClickOutside }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [id, setId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [ordering, setOrdering] = useState("added");
  const [platform, setPlatform] = useState(null);
  const [getPlatform, setGetPlatform] = useState(1);

  const handleClick = (elem) => {
    setId(elem);
    navigate(`/game/${elem.id}`);
  };
  /*  GetMonday permet de renvoyer la semaine actuelle du lundi au dimanche. */
  const getMonday = (d, d2) => {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); //

    d2 = new Date(d2);
    var day2 = d2.getDay(),
      diff2 = d2.getDate() + day2 + (day2 === 1 ? -6 : -1); //

    let Monday = new Date(d.setDate(diff));
    let Sunday = new Date(d2.setDate(diff2));

    //console.log("yo", Sunday);

    Monday =
      Monday.getFullYear() +
      "-" +
      (Monday.getMonth() + 1 >= 10
        ? Monday.getMonth() + 1
        : "0" + (Monday.getMonth() + 1)) +
      "-" +
      (Monday.getDate() >= 10 ? Monday.getDate() : "0" + Monday.getDate());

    Sunday =
      Sunday.getFullYear() +
      "-" +
      (Sunday.getMonth() + 1 >= 10
        ? Sunday.getMonth() + 1
        : "0" + (Sunday.getMonth() + 1)) +
      "-" +
      (Sunday.getDate() >= 10 ? Sunday.getDate() : "0" + Sunday.getDate());

    return `${Monday},${Sunday}`;
  };

  let thisWeek = getMonday(new Date(), new Date());
  /*   console.log(thisWeek); */

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `https://my-gamepad-backend.herokuapp.com/games?ordering=${ordering}&parent_platforms=${getPlatform}&dates=${thisWeek}`
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
      const response = await axios.get(
        `https://my-gamepad-backend.herokuapp.com/platform/list`
      );
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

export default CurrentWeek;
