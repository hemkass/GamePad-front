import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const handleClick = (type) => {
  console.log("mon doc", document.getElementById("review"));
};

const Modal = ({ Gametitle, children, type }) => {
  const [description, setDescription] = useState("");

  return (
    <div className="modal">
      <form className="modalContent">
        <h2>{`${type} ${Gametitle}`}</h2>
        {children}
        <textarea
          placeholder={`Write a ${type} `}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></textarea>
        <div id="closer" onClick={handleClick(type)}>
          <FontAwesomeIcon className="closebutton" icon="times" />
        </div>
      </form>
    </div>
  );
};

export default Modal;
