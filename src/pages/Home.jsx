import { useEffect } from "react";
import Calendar from "../components/calendar/Calendar";
import FinishedMatches from "../components/Matches/FinishedMatches-v2";
import sampleData from '../../data-sample.json';

function loadData() {
  localStorage.setItem('savedData', JSON.stringify(sampleData));
  console.log('Data loaded');
}

function Home() {
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="grid grid-cols-3">
      <Calendar />
      {/* <FinishedMatches date={'2024-10-20'} /> */}
      <FinishedMatches />
    </div>
  );
}

export default Home;