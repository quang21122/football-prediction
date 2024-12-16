import { useEffect, useState } from "react";
import Calendar from "../components/calendar/Calendar";
import UpcomingMatches from "../components/Matches/UpcomingMatches";
import finishedMatchesData from "../../finished-matches.json";
import liveMatchesData from "../../live-matches.json";
import upcomingMatchesData from "../../upcoming-matches.json";
import lineups from "../../lineups.json";
import headToHeadData from "../../head-to-head.json";
import playersData from "../../players.json";
import recentMatchesData from "../../recent-matches.json";
import matchStatisticsData from "../../match-statistics.json";
import recentMatchesData2 from "../../mc.json";
import upcomingClubData from "../../upcoming-club.json";
import playersClubData from "../../players-club.json";
import standingsData from "../../standings.json";
import clubInfoData from "../../club-info.json";
import eplMatches from "../../epl-matches.json";
import clubListData from "../../club-list.json";
import dayjs from "dayjs";

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
  localStorage.setItem("standingsData", JSON.stringify(standingsData));
  localStorage.setItem("clubInfoData", JSON.stringify(clubInfoData));
  localStorage.setItem("eplMatches", JSON.stringify(eplMatches));
  localStorage.setItem("clubListData", JSON.stringify(clubListData));
  console.log("Data loaded");
}

function Home() {
  const [selectedDate, setSelectedDate] = useState(dayjs().subtract(2, "year"));
  useEffect(() => {
    loadData();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date); // Update selected date
  };

  // const onMatchClick = (match) => {
  //   console.log("Match clicked", match);
  //   setSelectedMatch(match);
  // };

  return (
    <div className="grid grid-cols-[3fr_7fr] py-10 gap-x-20 max-w-[120rem] mx-auto">
      <div className="flex flex-col">
        <Calendar onDateSelect={handleDateSelect} />
      </div>
      <div className="">
        <UpcomingMatches date={selectedDate.format("YYYY-MM-DD")} />
      </div>
    </div>
  );
}

export default Home;
