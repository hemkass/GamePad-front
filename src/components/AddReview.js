import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

/* import Modal from "./modal"; */

const AddReviews = ({ title, setAddReview, addReview, type, id_game }) => {
  const token = Cookies.get("Login");

  const [description, setDescription] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://my-gamepad-backend.herokuapp.com/review/add" /*"http://localhost:4000/review/add"*/,

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        {
          rating: `${rating}`,
          description: `${description}`,
          id_game: `${id_game}`,
          name: `${title}`,
          created: new Date(),
        }
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return token ? (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>{`${type} : " ${title} "`}</h2>
        <textarea
          placeholder={`Write a ${type} `}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></textarea>{" "}
        <div className="submitBox">
          <button className="submit" type="submit">
            Publish
          </button>
        </div>
        <div
          id="closer"
          onClick={() => {
            setAddReview(false);
          }}
        >
          <FontAwesomeIcon className="closebutton" icon="times" />
        </div>
      </form>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default AddReviews;
