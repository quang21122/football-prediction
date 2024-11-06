import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Lineups() {
  const [lineups, setLineups] = useState([]);
  const [playersData, setPlayersData] = useState({});

  useEffect(() => {
    const savedLineups = localStorage.getItem("lineupsData");
    const savedPlayersData = localStorage.getItem("playersData");
    setLineups(savedLineups ? JSON.parse(savedLineups) : []);
    setPlayersData(savedPlayersData ? JSON.parse(savedPlayersData) : {});
    console.log("Lineups:", savedLineups);
    console.log("Players data:", savedPlayersData);
  }, []);

  return (
    <div className="bg-green-50 p-10 mt-12 rounded-[3rem]">
      <h3 className="text-3xl font-bold text-green-700 mb-6">
        Đội hình ra sân
      </h3>
      <div className="flex justify-around">
        {lineups.map((teamLineup, index) => (
          <div key={index} className="w-1/2">
            <h4 className="text-2xl font-bold text-green-600 mb-4">
              {teamLineup.team.name}
            </h4>
            <img
              src={teamLineup.team.logo}
              alt={teamLineup.team.name}
              className="w-20 h-20 mb-4"
            />
            <p className="text-xl font-bold text-gray-700 mb-2">
              Huấn luyện viên: {teamLineup.coach.name}
            </p>

            {/* Starting XI */}
            <h5 className="text-xl font-semibold text-green-600 my-4">
              Đội hình xuất phát
            </h5>
            <ul className="space-y-4">
              {teamLineup.startXI.map((player, playerIndex) => (
                <li key={playerIndex} className="flex items-center space-x-4">
                  <img
                    src={
                      playersData[player.player.id] ||
                      "https://via.placeholder.com/50"
                    }
                    alt={player.player.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="font-semibold">{player.player.number}</span>
                  <span>{player.player.name}</span>
                </li>
              ))}
            </ul>

            {/* Substitutes */}
            <h5 className="text-xl font-semibold text-green-600 my-4">
              Cầu thủ dự bị
            </h5>
            <ul className="space-y-4">
              {teamLineup.substitutes.map((sub, subIndex) => (
                <li key={subIndex} className="flex items-center space-x-4">
                  <img
                    src={
                      playersData[sub.player.id] ||
                      "https://via.placeholder.com/50"
                    }
                    alt={sub.player.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="font-semibold">{sub.player.number}</span>
                  <span>{sub.player.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

Lineups.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Lineups;
