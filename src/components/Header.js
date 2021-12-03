import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [Loading, setLoading] = useState(true);
  const [modal, setModal] = useState("hidden");

  /*  console.log("ma recherche", search) */ useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4000/search?search=${search}`
      );
      console.log(response.data);
      setSearchResult(response.data);
      setLoading(false);
    };

    fetchData();
  }, [search]);
  /*  console.log(searchResult); */

  const handleSearch = (result) => {
    setModal("hidden");
    navigate(`/game-like-/${result.id}`);
  };

  return Loading ? (
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
      <div>
        <input
          onFocus={() => {
            setModal("seachResult");
          }}
          onBlur={() => {
            setModal("hidden");
          }}
          className="searchBar"
          type="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        ></input>
        <div className={modal}>
          {searchResult.results.map((result, index) => {
            return (
              <div
                key={index}
                onBlur={() => {
                  setModal("hidden");
                }}
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
                  <img
                    src={result.background_image}
                    alt="miniature du jeu"
                  ></img>
                </div>
                <div className="resultDetails">
                  {result.parent_platforms &&
                    result.parent_platforms.map((elem, index) => {
                      return (
                        <span key={index}>
                          {elem.platform.name === "PC" ? (
                            <FontAwesomeIcon
                              className="iconPlateform"
                              icon={["fas", "desktop"]}
                            />
                          ) : elem.platform.name === "PlayStation" ? (
                            <FontAwesomeIcon
                              className="iconPlateform"
                              icon={["fas", "gamepad"]}
                            />
                          ) : (
                            elem.platform.name
                          )}
                        </span>
                      );
                    })}
                  <div className="titleSearch">{result.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
