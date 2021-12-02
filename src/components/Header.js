import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState("hidden");

  console.log("ma recherche", search);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4000/search?search=${search}`
      );
      /*  console.log(response.data); */
      setSearchResult(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [search]);
  console.log(searchResult);

  const handleSearch = (result) => {
    navigate(`/game-like-/${result.id}`);
  };

  return isLoading ? (
    <div>en chargement</div>
  ) : (
    <div className="header">
      <div className="logoimg">
        <i className="gg-pentagon-bottom-left"></i>
        <i className="gg-pentagon-bottom-right"></i>
        <i className="gg-pentagon-top-left"></i>
        <i className="gg-pentagon-top-right"></i>
      </div>
      <div className="logotext">GAMEPAD</div>
      <input
        className="searchBar"
        type="search"
        value={search}
        onFocus={() => {
          setModal("seachResult");
        }}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        onBlur={() => {
          setModal("hidden");
        }}
      ></input>
      <div className={modal}>
        {/* <div className="seachResult"> */}
        {searchResult.results.map((result, index) => {
          return (
            <div
              key={index}
              className="resultBox"
              onClick={() => {
                handleSearch(result);
              }}
            >
              <div
                className="miniature"
                onClick={() => {
                  handleSearch(result);
                }}
              >
                <img src={result.background_image} alt="miniature du jeu"></img>
              </div>
              <div className="resultDetails">
                {result.parent_platforms && (
                  <span>
                    <span>
                      {result.parent_platforms.map((elem, index) => {
                        if (elem.platform.name === "PC") {
                          return (
                            <FontAwesomeIcon
                              className="iconPlateform"
                              icon={["fas", "desktop"]}
                            />
                          );
                        }
                        if (elem.platform.name === "PlayStation") {
                          return (
                            <FontAwesomeIcon
                              className="iconPlateform"
                              icon={["fas", "gamepad"]}
                            />
                          );
                        }
                        return (
                          <span className="iconPlateform" key={index}>
                            {elem.platform.name}
                          </span>
                        );
                      })}
                    </span>
                  </span>
                )}
                <div className="titleSearch">{result.name}</div>
              </div>
            </div>
          );
        })}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Header;
