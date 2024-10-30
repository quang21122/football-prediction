import { useState, useEffect } from "react";
import Calendar from "../components/calendar/Calendar";
import FinishedMatches from "../components/Matches/FinishedMatches-v2";
import LiveMatches from "../components/Matches/LiveMatches-v2";
import UpcomingMatches from "../components/Matches/UpcomingMatches-v2";
import finishedMatchesData from "../../finished-matches.json";
import liveMatchesData from "../../live-matches.json";
import upcomingMatchesData from "../../upcoming-matches.json";
import MatchDetails from "../components/Matches/MatchDetails-v2";
import Leaderboard from "../components/leaderboard/Leaderboard";
import lineups from "../../lineups.json";
import headToHeadData from "../../head-to-head.json";
import playersData from "../../players.json";

function loadData() {
  localStorage.setItem('finishedMatchesData', JSON.stringify(finishedMatchesData));
  localStorage.setItem('liveMatchesData', JSON.stringify(liveMatchesData));
  localStorage.setItem('upcomingMatchesData', JSON.stringify(upcomingMatchesData));
  localStorage.setItem('lineupsData', JSON.stringify(lineups));
  localStorage.setItem('headToHeadData', JSON.stringify(headToHeadData));
  localStorage.setItem('playersData', JSON.stringify(playersData));
  console.log('Data loaded');
}

function Home() {
  const [selectedMatch, setSelectedMatch] = useState(
    {
      "fixture": {
        "id": 157256,
        "referee": "M. Oliver",
        "timezone": "UTC",
        "date": "2024-10-20T15:30:00+00:00",
        "timestamp": 1737241200,
      },
      "league": {
        "id": 39,
        "name": "Premier League",
        "country": "England",
        "logo": "https://media.api-sports.io/football/leagues/39.png",
        "flag": "https://media.api-sports.io/flags/gb.svg"
      },
      "teams": {
        "home": {
          "id": 40,
          "name": "Liverpool",
          "logo": "https://media.api-sports.io/football/teams/40.png"
        },
        "away": {
          "id": 49,
          "name": "Chelsea",
          "logo": "https://media.api-sports.io/football/teams/49.png"
        }
      },
      "goals": {
        "home": 2,
        "away": 1
      },
      "score": {
        "halftime": {
          "home": 1,
          "away": 0
        },
        "fulltime": {
          "home": 2,
          "away": 1
        },
        "extratime": {
          "home": null,
          "away": null
        },
        "penalty": {
          "home": null,
          "away": null
        }
      },
    },
  );

  useEffect(() => {
    loadData();
  }, []);

  const onMatchClick = (match) => {
    console.log('Match clicked', match);
    setSelectedMatch(match);
  }

  return (
    <div className="grid grid-cols-3 py-10">
      <div className="flex flex-col">
        <Calendar />
        <Leaderboard />
      </div>
      <div className="bg-white p-8 rounded-[3rem]">
        <p className="text-5xl font-bold text-green-600">Danh sách trận đấu</p>
        {/* <UpcomingMatches date={'2024-11-02'} /> */}
        {/* <LiveMatches date={'2024-10-26'} /> */}
        {/* <FinishedMatches date={'2024-10-20'} /> */}
        <UpcomingMatches onMatchClick={onMatchClick} />
        <LiveMatches onMatchClick={onMatchClick} />
        <FinishedMatches onMatchClick={onMatchClick} />
      </div>
      <MatchDetails selectedMatch={selectedMatch} />
    </div>
  );
}

export default Home;