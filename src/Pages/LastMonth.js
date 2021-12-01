const LastMonth = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fonction pour calculer les 30 derniers jours
  const getLastMonth = () => {
    let Todaydate = new Date();

    console.log(Todaydate);
    Todaydate =
      Todaydate.getFullYear() +
      "-" +
      (Todaydate.getMonth() + 1) +
      "-" +
      Todaydate.getDate();

    let date = new Date();
    let lastMonth =
      date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

    let dates = `${lastMonth},${Todaydate}`;
    return dates;
  };

  let last30days = getLastMonth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:4000/games?dates=${last30days}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [last30days]);
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
                  <img src={elem.background_image}></img>{" "}
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

export default LastMonth;
