import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Lineups({ matchId }) {
  const [lineups, setLineups] = useState([]);
  const [playersData, setPlayersData] = useState({});

  useEffect(() => {
    const fetchLineups = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", import.meta.env.VITE_RAPIDAPI_KEY);
        myHeaders.append("x-rapidapi-host", import.meta.env.VITE_RAPIDAPI_HOST);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const lineupResponse = await fetch(
          `https://v3.football.api-sports.io/fixtures/lineups?fixture=${matchId}`,
          requestOptions
        );
        const lineupData = await lineupResponse.json();
        setLineups(lineupData.response);
        localStorage.setItem("lineups", JSON.stringify(lineupData.response));
        console.log("lineups", JSON.stringify(lineupData.response));

        const playersResponse = await fetch(
          `https://v3.football.api-sports.io/fixtures/players?fixture=${matchId}`,
          requestOptions
        );
        const playersData = await playersResponse.json();

        const playerPhotos = playersData.response.reduce((acc, team) => {
          team.players.forEach((player) => {
            acc[player.player.id] = player.player.photo;
          });
          return acc;
        }, {});

        setPlayersData(playerPhotos);
        localStorage.setItem("playersData", JSON.stringify(playerPhotos));
        console.log("players", JSON.stringify(playerPhotos));
      } catch (error) {
        console.error("Error fetching lineups or players:", error);
      }
    };

    fetchLineups();
  }, [matchId]);

  return (
    <div className="p-6 w-[120rem] mx-auto px-20">
      <div className="border border-zinc-300 shadow-2xl rounded-3xl py-10">
        <div className="grid grid-cols-2">
          {lineups.map((teamLineup, index) => (
            <div
              key={index}
              className={`${
                index === 0 ? "border-r-2 border-zinc-300" : ""
              } p-6`}
            >
              <div
                className={`flex ${
                  index === 0 ? "flex-row" : "flex-row-reverse"
                } justify-between mb-3`}
              >
                <h2 className="text-3xl font-bold text-red-500 px-12 flex items-center">
                  Đội hình xuất phát
                </h2>
                <div
                  className={`flex ${
                    index === 0 ? "" : "flex-row-reverse"
                  } items-center`}
                >
                  <h2 className="text-3xl font-bold text-center mr-5">
                    {teamLineup.team.name}
                  </h2>
                  <img
                    src={teamLineup.team.logo}
                    alt={teamLineup.team.name}
                    className="w-20 h-20 mr-6"
                  />
                </div>
              </div>
              {/* Starting XI */}
              <div className="grid grid-cols-2 px-12">
                {teamLineup.startXI.map((player, playerIndex) => (
                  <div
                    key={playerIndex}
                    className="flex items-center space-x-6 py-2"
                  >
                    <img
                      src={
                        playersData[player.player.id] ||
                        "https://via.placeholder.com/50"
                      }
                      alt={player.player.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <span className="font-semibold text-xl">
                      {player.player.number}
                    </span>
                    <span className="text-lg">{player.player.name}</span>
                  </div>
                ))}
              </div>

              {/* Substitues */}
              <h2 className="text-3xl font-bold text-red-500 px-12 flex items-center mt-10 mb-3">
                Cầu thủ dự bị
              </h2>
              <div className="grid grid-cols-3 px-18">
                {teamLineup.substitutes.map((sub, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex items-center space-x-2 py-2 px-6"
                  >
                    <img
                      src={
                        playersData[sub.player.id] ||
                        "https://via.placeholder.com/50"
                      }
                      alt={sub.player.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <span className="font-semibold text-xl">
                      {sub.player.number}
                    </span>
                    <span className="text-lg">{sub.player.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Lineups.propTypes = {
  matchId: PropTypes.number.isRequired,
};

export default Lineups;
