import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar = () => {
  return (
    <div>
      <div>
        <h2>New Releases</h2>
        <div>
          <span>
            {" "}
            <FontAwesomeIcon
              className="icon"
              icon={["fas", "heart"]}
              onClick={() => {}}
            />
          </span>
          <span>Last 30 days</span>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SideBar;
