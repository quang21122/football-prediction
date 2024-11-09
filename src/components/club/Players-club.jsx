import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function PlayersClub({ clubId }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
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
          `https://v3.football.api-sports.io/players/squads?team=${clubId}`,
          requestOptions
        );

        const data = await response.json();
        const playersData = data.response[0]?.players || []; // Get the players array from the first team object

        localStorage.setItem("playersClub", JSON.stringify(playersData));
        console.log("Players:", JSON.stringify(playersData));

        setPlayers(playersData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [clubId]);

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-red-500 text-3xl">{error.message}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Players</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <img src={player.photo} alt={player.name} />
            <p>{player.name}</p>
            <p>{player.position}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

PlayersClub.propTypes = {
  clubId: PropTypes.number.isRequired,
};

export default PlayersClub;
