import { useEffect, useState } from "react";

const Standings = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const savedStandings = JSON.parse(localStorage.getItem("standingsData"));
    console.log("Standings data:", savedStandings);
    if (savedStandings && savedStandings[0].league.standings[0]) {
      setStandings(savedStandings[0].league.standings[0]);
    }
  }, []);

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
