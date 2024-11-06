import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function MatchStatistics({ matchId }) {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", import.meta.env.VITE_RAPIDAPI_KEY);
        myHeaders.append("x-rapidapi-host", import.meta.env.VITE_RAPIDAPI_HOST);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures/statistics?fixture=${matchId}`,
          requestOptions
        );
        const data = await response.json();

        setStatistics(data.response);
        localStorage.setItem("statistics", JSON.stringify(data.response));
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [matchId]);

  return (
    <div className="bg-green-50 p-8 m-6 mt-12 rounded-[3rem]">
      <h3 className="text-3xl font-bold text-green-700 mb-6">
        Thống kê trận đấu
      </h3>
      <div className="grid grid-cols-2 gap-8">
        {statistics.map((stat, index) => (
          <div key={index}>
            <h4 className="text-2xl font-bold text-green-600 mb-4">
              {stat.type}
            </h4>
            <ul className="space-y-4">
              {stat.statistics.map((item, itemIndex) => (
                <li key={itemIndex} className="flex justify-between">
                  <span>{item.value}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

MatchStatistics.propTypes = {
  matchId: PropTypes.number.isRequired,
};

export default MatchStatistics;
