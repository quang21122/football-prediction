import Calendar from "../components/calendar/Calendar";
import FinishedMatches from "../components/Matches/FinishedMatches";

function Home() {
  return (
    <div className="grid grid-cols-3">
      <Calendar />
      <FinishedMatches date={'2024-10-20'} />
    </div>
  );
}

export default Home;