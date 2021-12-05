import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = React.forwardRef(
  ({ modal, setModal, handleClickOutside }, ref) => {
    /* console.log("ref ==>", ref); */
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [Loading, setLoading] = useState(true);
    /* y */

    /*  console.log("ma recherche", search) */ useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(
          `http://localhost:4000/search?search=${search}`
        );
        /* console.log("mesdatas", response.data); */
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
    let placeholder = search.count;
    /*  console.log(placeholder); */
    return Loading ? (
      <div>en chargement</div>
    ) : (
      <div className="header" onClick={handleClickOutside}>
        <div className="logoimg">
          <i className="gg-pentagon-bottom-left"></i>
          <i className="gg-pentagon-bottom-right"></i>
          <i className="gg-pentagon-top-left"></i>
          <i className="gg-pentagon-top-right"></i>{" "}
          <div className="logotext">GAMEPAD</div>
        </div>

        <div className="research">
          <input
            ref={(elem) => (ref.current[0] = elem)}
            onFocus={(event) => {
              event.preventDefault();
              /* console.log("focus", ref.current); */
              setModal("seachResult");
            }}
            className="searchBar"
            type="search"
            placeholder={placeholder}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          ></input>
          <div className={modal} ref={(elem) => (ref.current[1] = elem)}>
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
  }
);

export default Header;
