// MatchDetails.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MatchDetails() {
  const { id } = useParams(); // Retrieve match ID from the URL
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const savedMatches = JSON.parse(
      localStorage.getItem("upcomingMatchesData")
    );
    if (savedMatches) {
      const selectedMatch = savedMatches.find(
        (m) => m.fixture.id === parseInt(id)
      );
      setMatch(selectedMatch);
    }
  }, [id]);

  if (!match) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">Match not found.</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-4">{match.league.name}</h2>
      <div className="flex items-center justify-center">
        <img
          src={match.teams.home.logo}
          alt={match.teams.home.name}
          className="w-28 h-28"
        />
        <div className="mx-10 text-5xl font-bold">vs</div>
        <img
          src={match.teams.away.logo}
          alt={match.teams.away.name}
          className="w-28 h-28"
        />
      </div>
      <p className="text-2xl text-center mt-4">
        {match.teams.home.name} vs {match.teams.away.name}
      </p>
      <p className="text-xl text-center mt-4">
        Date:{" "}
        {new Date(match.fixture.date).toLocaleDateString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        })}
        <br />
        Time:{" "}
        {new Date(match.fixture.date).toLocaleTimeString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        })}
      </p>
    </div>
  );
}

export default MatchDetails;
