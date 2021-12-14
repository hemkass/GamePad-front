import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useParams } from "react-router-dom";

const Screenshot = ({ handleClickOutside }) => {
  const location = useLocation();
  console.log("aff", location.state);
  const { id } = useParams();
  return (
    <div className="gamewrapper" onClick={handleClickOutside}>
      <div className="gameSideBar">
        <SideBar SideBar="GameSideBar" />
      </div>
      <div className="screencontent">
        <div className="ScreenLeftSide">
          <h1>{location.state.name}</h1>
          <div className="screenshot">
            {location.state.screenshot.map((screen, ind) => {
              return (
                <div key={ind} className="allscreenImg">
                  <img src={`${screen.image}`}></img>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${location.state.background})`,
          opacity: 0.25,
        }}
        className="backgroundGame "
      ></div>
    </div>
  );
};

export default Screenshot;
