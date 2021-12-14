import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SideBar from "../components/SideBar";
import AddReviews from "../components/AddReview";
import AddComment from "../components/AddComment";

const Game = ({ handleClickOutside }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  /* console.log("Mon état", location.state); */

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReadMore, setIsReadMore] = useState(true);
  const [review, setReview] = useState([]);
  const [addReview, setAddReview] = useState(false);
  const [addComment, setAddComment] = useState("hidden");

  /* document.getElementById("closebutton").onclick(setAddReview("hidden")); */
  /* if (document.getElementById("closer")) {
    document.getElementById("closer").onclick = () => {
      setAddComment("hidden");
      setAddReview("hidden");
    };
  }
  console.log("mon état", addComment);
     .onclick(setAddReview("hidden"));
  console.log("ma div", document.getElementById("closer")); */

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `https://my-gamepad-backend.herokuapp.com/games/${id}`
      );
      const review = await axios.get(
        `https://my-gamepad-backend.herokuapp.com/reviews/${id}`
      );
      /* console.log("hello", response.data); */
      setData(response.data);
      setReview(review.data);

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  /* console.log("TESTreview", review); */
  /*  GetMonday permet de renvoyer la semaine actuelle du lundi au dimanche. */
  /*  console.log(data.background_image); */
  /* console.log(data); */
  /*   console.log(data.ratings); */
  return isLoading ? (
    <div>en chargement</div>
  ) : (
    <div className="gamewrapper" onClick={handleClickOutside}>
      <div className={addComment === false ? "hidden" : "modal"} id="comment">
        <AddComment
          title={data.name}
          addComment={addComment}
          setAddComment={setAddComment}
          type="comment"
        />
      </div>
      <div className={addReview === false ? "hidden" : "modal"}>
        <AddReviews
          id_game={id}
          title={data.name}
          id="review"
          addReview={addReview}
          setAddReview={setAddReview}
          type="review"
        />
      </div>
      <div className="gameSideBar">
        <SideBar SideBar="GameSideBar" />
      </div>
      <div className="gamecontent">
        <div className="leftside">
          <div className="info">
            <span>{data.released}</span>
            <span>{data.playtime}</span>
          </div>

          <h1>{data.name}</h1>
          <div className="ComBox">
            <button
              onClick={() => {
                console.log(AddReviews);
                setAddReview("modal");
              }}
            >
              <FontAwesomeIcon className="plus" icon="plus" />
              Write a Review
            </button>
            <button
              onClick={() => {
                setAddComment("modal");
              }}
            >
              <FontAwesomeIcon className="plus" icon="comment-dots" />
              Write a comment
            </button>
          </div>
          <div className="RatingsBar">
            {data.ratings.map((rating, id) => {
              return (
                data.ratings.lenght != 0 && (
                  <button
                    key={rating.id}
                    style={{
                      width: `${rating.percent - 5}%`,
                    }}
                    className={`ratingBox ${rating.title}`}
                  ></button>
                )
              );
            })}
          </div>
          <div>
            <div className="RatingCount">
              {data.ratings.map((rating, id) => {
                return (
                  data.ratings.lenght != 0 && (
                    <span key={rating.id}>
                      <span>{rating.title} : </span>
                      <span key={rating.id}>{rating.count}</span>
                    </span>
                  )
                );
              })}
            </div>
            <h2>About :</h2>
            <h4>
              {isReadMore
                ? data.description_raw.slice(0, 700)
                : data.description_raw}
              {data.description_raw.length > 700 && (
                <button onClick={toggleReadMore} className="readButton">
                  {isReadMore ? "...read more" : " ...show less"}
                </button>
              )}
            </h4>
          </div>
        </div>
        <div className="rightside">
          <div className="screenshotBox">
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
                        navigate(`/game/${id}/screenshot`, {
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
          </div>{" "}
          {review.reviews && (
            <div className="reviewsBox">
              <h2>Reviews:</h2>

              {review.reviews.map((elem) => {
                /*   console.log(elem.rating); */
                return (
                  <div key={elem._id} className="review">
                    <h3 className={`${elem.rating}`}>{elem.rating}</h3>
                    <p className="description">{elem.description}</p>
                    <p className="date">
                      <span>by {elem.owner.username}</span>
                      <span>date: {elem.created}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="SimilarGames"></div>
      </div>
      <div
        style={{
          backgroundImage: `url(${data.background_image})`,
          opacity: 0.2,
        }}
        className="backgroundGame "
      ></div>
    </div>
  );
};

export default Game;
