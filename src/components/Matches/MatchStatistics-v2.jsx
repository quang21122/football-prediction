import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function MatchStatistics() {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const matchStatistics = localStorage.getItem("statistics");
    setStatistics(matchStatistics ? JSON.parse(matchStatistics) : []);
    console.log("Match statistics:", matchStatistics);
  }, []);

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
                  <span>{item.type}</span>
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
