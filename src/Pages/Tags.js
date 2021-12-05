import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

const Tags = ({ handleClickOutside }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  /* console.log("Mon état", location.state.screenshot); */

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:4000/games/${id}`);
      /* console.log("hello", response.data); */
      setData(response.data);

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  /*  GetMonday permet de renvoyer la semaine actuelle du lundi au dimanche. */
  /*  console.log(data.background_image); */

  return isLoading ? (
    <div>en chargement</div>
  ) : (
    <div className="gamewrapper" onClick={handleClickOutside}>
      <div className="gameSideBar">
        <SideBar SideBar="GameSideBar" />
      </div>
      <div className="gamecontent">
        <div className="leftside">
          <div>
            <span>{data.released}</span>
            <span>{data.playtime}</span>
          </div>

          <h1>Game like : {data.name}</h1>

          <div>{data.description_raw} </div>
        </div>
        <div className="rightside">
          <div className="screenshot">
            {location.state.screenshot.map((screen, ind) => {
              if (ind < 4) {
                return (
                  <div
                    key={ind}
                    className={ind === 0 ? "firstscreenImg" : "screenImg"}
                  >
                    <img src={`${screen.image}`}></img>
                  </div>
                );
              }
              if (ind === 5) {
                return (
                  <div key={ind} className="screenImg">
                    <img src={`${screen.image}`}></img>
                    <div
                      className="seeMoreModal"
                      onClick={() => {
                        navigate(`/game-like-/${id}/screenshot`, {
                          state: {
                            screenshot: location.state.screenshot,
                            background: data.background_image,
                            name: location.state.name,
                          },
                        });
                      }}
                    >
                      <p>see more ... </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="SimilarGames"></div>
      </div>

      <div
        style={{
          backgroundImage: `url(${data.background_image})`,
          opacity: 0.65,
        }}
        className="backgroundGame "
      ></div>
    </div>
  );
};

export default Tags;
