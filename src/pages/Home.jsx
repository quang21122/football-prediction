import { useEffect } from "react";
import Calendar from "../components/calendar/Calendar";
import FinishedMatches from "../components/Matches/FinishedMatches-v2";
// import LiveMatches from "../components/Matches/LiveMatches-v2";
import UpcomingMatches from "../components/Matches/UpcomingMatches-v2";
import finishedMatchesData from "../../finished-matches.json";
import liveMatchesData from "../../live-matches.json";
import upcomingMatchesData from "../../upcoming-matches.json";
// import MatchDetails from "../components/Matches/MatchDetails-v2";
import lineups from "../../lineups.json";
import headToHeadData from "../../head-to-head.json";
import playersData from "../../players.json";
import recentMatchesData from "../../recent-matches.json";
import matchStatisticsData from "../../match-statistics.json";
import recentMatchesData2 from "../../mc.json";
import upcomingClubData from "../../upcoming-club.json";
import playersClubData from "../../players-club.json";

function loadData() {
  localStorage.setItem(
    "finishedMatchesData",
    JSON.stringify(finishedMatchesData)
  );
  localStorage.setItem("liveMatchesData", JSON.stringify(liveMatchesData));
  localStorage.setItem(
    "upcomingMatchesData",
    JSON.stringify(upcomingMatchesData)
  );
  localStorage.setItem("lineupsData", JSON.stringify(lineups));
  localStorage.setItem("headToHeadData", JSON.stringify(headToHeadData));
  localStorage.setItem("playersData", JSON.stringify(playersData));
  localStorage.setItem("recentMatchesData", JSON.stringify(recentMatchesData));
  localStorage.setItem(
    "recentMatchesData2",
    JSON.stringify(recentMatchesData2)
  );
  localStorage.setItem(
    "matchStatisticsData",
    JSON.stringify(matchStatisticsData)
  );
  localStorage.setItem("upcomingClubData", JSON.stringify(upcomingClubData));
  localStorage.setItem("playersClubData", JSON.stringify(playersClubData));
  console.log("Data loaded");
}

function Home() {
  // const [selectedMatch, setSelectedMatch] = useState({
  //   fixture: {
  //     id: 157256,
  //     referee: "M. Oliver",
  //     timezone: "UTC",
  //     date: "2024-10-20T15:30:00+00:00",
  //     timestamp: 1737241200,
  //   },
  //   league: {
  //     id: 39,
  //     name: "Premier League",
  //     country: "England",
  //     logo: "https://media.api-sports.io/football/leagues/39.png",
  //     flag: "https://media.api-sports.io/flags/gb.svg",
  //   },
  //   teams: {
  //     home: {
  //       id: 40,
  //       name: "Liverpool",
  //       logo: "https://media.api-sports.io/football/teams/40.png",
  //     },
  //     away: {
  //       id: 49,
  //       name: "Chelsea",
  //       logo: "https://media.api-sports.io/football/teams/49.png",
  //     },
  //   },
  //   goals: {
  //     home: 2,
  //     away: 1,
  //   },
  //   score: {
  //     halftime: {
  //       home: 1,
  //       away: 0,
  //     },
  //     fulltime: {
  //       home: 2,
  //       away: 1,
  //     },
  //     extratime: {
  //       home: null,
  //       away: null,
  //     },
  //     penalty: {
  //       home: null,
  //       away: null,
  //     },
  //   },
  // });

  useEffect(() => {
    loadData();
  }, []);

  // const onMatchClick = (match) => {
  //   console.log("Match clicked", match);
  //   setSelectedMatch(match);
  // };

  return (
    <div className="grid grid-cols-[3fr_7fr] py-10 gap-x-20 max-w-[120rem] mx-auto">
      <div className="flex flex-col">
        <Calendar />
        <h2 className="text-4xl font-bold pt-10 pb-5 flex justify-center items-center text-primary">
          Các trận đấu đã kết thúc
        </h2>
        {/* <FinishedMatches /> */}
        <FinishedMatches date={"2024-11-02"} />
      </div>
      <div className="">
        {/* <UpcomingMatches date={'2024-11-02'} /> */}
        {/* <LiveMatches date={'2024-10-26'} /> */}
        {/* <FinishedMatches date={'2024-10-20'} /> */}
        {/* <UpcomingMatches onMatchClick={onMatchClick} />
        <LiveMatches onMatchClick={onMatchClick} />
        <FinishedMatches onMatchClick={onMatchClick} /> */}
        <UpcomingMatches date={"2024-11-09"} />
        {/* <UpcomingMatches /> */}
        {/* <LiveMatches />
        <FinishedMatches /> */}
      </div>
      {/* <MatchDetails selectedMatch={selectedMatch} /> */}
    </div>
  );
}

export default Home;
