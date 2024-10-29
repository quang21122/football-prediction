import { useEffect } from "react";
import Calendar from "../components/calendar/Calendar";
import FinishedMatches from "../components/Matches/FinishedMatches-v2";
import LiveMatches from "../components/Matches/LiveMatches-v2";
import UpcomingMatches from "../components/Matches/UpcomingMatches-v2";
import finishedMatchesData from "../../finished-matches.json";
import liveMatchesData from "../../live-matches.json";
import upcomingMatchesData from "../../upcoming-matches.json";
import Leaderboard from "../components/leaderboard/Leaderboard";

function loadData() {
  localStorage.setItem('finishedMatchesData', JSON.stringify(finishedMatchesData));
  localStorage.setItem('liveMatchesData', JSON.stringify(liveMatchesData));
  localStorage.setItem('upcomingMatchesData', JSON.stringify(upcomingMatchesData));
  console.log('Data loaded');
}

function Home() {
  useEffect(() => {
    loadData();
  }, []);

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
        <UpcomingMatches />
        <LiveMatches />
        <FinishedMatches />
      </div>
    </div>
  );
}

export default Home;