import axios from "axios";
import { useState, useEffect } from "react";

const CurrentWeek = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fonction pour calculer la semaine actuelle
  const getMonday = (d, x) => {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); //

    let Monday = new Date(d.setDate(diff));
    let Sunday = new Date(d.setDate(diff + x));
    console.log(Monday);
    console.log(Sunday);

    Monday =
      Monday.getFullYear() +
      "-" +
      (Monday.getMonth() + 1) +
      "-" +
      Monday.getDate();

    Sunday =
      Sunday.getFullYear() +
      "-" +
      (Sunday.getMonth() + 1) +
      "-" +
      Sunday.getDate();

    return `${Monday},${Sunday}`;
  };
  let thisWeek = getMonday(new Date(), 7);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4000/games?dates=${thisWeek}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [thisWeek]);
  /*  GetMonday permet de renvoyer la semaine actuelle du lundi au dimanche. */

  return isLoading ? (
    <div>en chargement</div>
  ) : (
    <div className="content">
      <h1>Le mois dernier</h1>
      <div className="section">
        {data.results.map((elem) => {
          return (
            elem.background_image && (
              <div className="box">
                <div>
                  <img
                    src={elem.background_image}
                    alt="descriptive du jeu"
                  ></img>{" "}
                </div>

                <div>{elem.name}</div>
              </div>
            )
          );
        })}
      </div>
      <div></div>
    </div>
  );
};

export default CurrentWeek;
