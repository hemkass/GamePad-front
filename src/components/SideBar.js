import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar = () => {
  return (
    <div className="sideBar">
      <div>
        <div className="paddingBottom">
          <h2>New Releases</h2>
        </div>
        <div className="menuItem">
          <span>
            <FontAwesomeIcon
              className="menuIcon"
              icon={["fas", "heart"]}
              onClick={() => {}}
            />
          </span>

          <span>
            <Link className="navLink" to="/last-month">
              <h3>Last 30 days</h3>
            </Link>
          </span>
        </div>

        <div className="menuItem">
          <span>
            <FontAwesomeIcon
              className="menuIcon"
              icon={["fas", "fire-alt"]}
              onClick={() => {}}
            />
          </span>
          <span>
            <Link className="navLink" to="/this-week">
              <h3>This week</h3>
            </Link>
          </span>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SideBar;
