import { useEffect } from "react";
import Calendar from "../components/calendar/Calendar";
import FinishedMatches from "../components/Matches/FinishedMatches-v2";
import LiveMatches from "../components/Matches/LiveMatches-v2";
import finishedMatchesData from "../../finished-matches.json";
import liveMatchesData from "../../live-matches.json";

function loadData() {
  localStorage.setItem('finishedMatchesData', JSON.stringify(finishedMatchesData));
  localStorage.setItem('liveMatchesData', JSON.stringify(liveMatchesData));
  console.log('Data loaded');
}

function Home() {
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="grid grid-cols-3 py-10">
      <Calendar />
      <div className="bg-white p-8 rounded-[3rem]">
        <p className="text-5xl font-bold text-green-600">Danh sách trận đấu</p>
        {/* <LiveMatches date={'2024-10-26'} /> */}
        {/* <FinishedMatches date={'2024-10-20'} /> */}
        <LiveMatches />
        <FinishedMatches />
      </div>
    </div>
  );
}

export default Home;