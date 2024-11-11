import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { leagueId } = useParams();

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/standings?season=2022&league=${leagueId}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
              "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
            },
          }
        );
        const data = await response.json();
        console.log(JSON.stringify(data.response));
        if (data.response && data.response.length > 0) {
          setStandings(data.response[0].league.standings[0]);
        } else {
          setError(new Error("No standings data found."));
        }
      } catch (error) {
        console.error("Error fetching standings:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [leagueId]);

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">Loading match details...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">Error fetching standings: {error.message}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>EPL Standings 2022</h1>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, index) => (
            <tr key={index}>
              <td>{team.rank}</td>
              <td>{team.team.name}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
