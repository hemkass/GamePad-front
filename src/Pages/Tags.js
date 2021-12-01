import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";

const Tags = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:4000/games/${id}`);
      console.log("hello", response.data);
      setData(response.data);

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  /*  GetMonday permet de renvoyer la semaine actuelle du lundi au dimanche. */
  console.log(data.background_image);
  const divStyle = {
    backgroundImage: `url(${data.background_image})`,
    opacity: 0.65,
    width: "100vw",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  };
  return isLoading ? (
    <div>en chargement</div>
  ) : (
    <div className="gamewrapper">
      <div>
        <SideBar className="sideBar" />
      </div>
      <div className="gamecontent">
        <div className="leftside">
          <div>
            <span>{data.released}</span>
            <span>{data.playtime}</span>
          </div>
          <div className="title">
            <h1>Game like : {data.name}</h1>
          </div>
          <div>{data.description_raw} </div>
        </div>
        <div div className="rightside">
          hello
        </div>
      </div>
      <div style={divStyle} className="backgroundGame "></div>
    </div>
  );
};

export default Tags;
