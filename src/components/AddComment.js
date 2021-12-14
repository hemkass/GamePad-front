import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./modal";

const AddComment = ({ title, type, addComment, setAddComment }) => {
  const [description, setDescription] = useState("");
  /*  const handleClick = () => {
    setAddComment("hidden");
  }; */
  return (
    <div className="modal">
      <form className="modalContent">
        <h2>{`${type} ${title}`}</h2>
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
            setAddComment(false);
          }}
        >
          <FontAwesomeIcon className="closebutton" icon="times" />
        </div>
      </form>
    </div>
  );
};

export default AddComment;
