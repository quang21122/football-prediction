import { useEffect, useState } from "react";
import Calendar from "../components/calendar/Calendar";
import UpcomingMatches from "../components/Matches/UpcomingMatches";
import playersData from "../../players.json";
import upcomingClubData from "../../upcoming-club.json";
import playersClubData from "../../players-club.json";
import clubInfoData from "../../club-info.json";
import clubListData from "../../club-list.json";
import dayjs from "dayjs";

function loadData() {
  localStorage.setItem("playersData", JSON.stringify(playersData));
  localStorage.setItem("upcomingClubData", JSON.stringify(upcomingClubData));
  localStorage.setItem("playersClubData", JSON.stringify(playersClubData));
  localStorage.setItem("clubInfoData", JSON.stringify(clubInfoData));
  localStorage.setItem("clubListData", JSON.stringify(clubListData));
}

function Home() {
  const [selectedDate, setSelectedDate] = useState(dayjs().subtract(2, "year"));
  useEffect(() => {
    loadData();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date); // Update selected date
  };

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
