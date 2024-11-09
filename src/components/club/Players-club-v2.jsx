import { useState, useEffect } from "react";

function PlayersClub() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("playersClubData"));
    if (savedData) {
      setPlayers(savedData);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">Loading...</h1>
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

export default PlayersClub;
