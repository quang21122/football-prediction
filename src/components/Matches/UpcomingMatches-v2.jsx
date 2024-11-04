import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function UpcomingMatches({ onMatchClick }) {
  const [matches, setMatches] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(3);

  useEffect(() => {
    const savedMatches = localStorage.getItem("upcomingMatchesData");
    console.log("savedMatches", savedMatches);
    if (savedMatches) {
      setMatches(JSON.parse(savedMatches));
    }
  }, []);

  const convertDate = (utcDate) => {
    const date = new Date(utcDate);
    const formattedDate = date.toLocaleDateString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "2-digit",
      minute: "2-digit",
    });
    return { formattedDate, formattedTime };
  };

  if (matches.length === 0) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">No matches found in localStorage.</h1>
      </div>
    );
  }

  const displayedMatches = matches.slice(0, displayLimit);

  const groupedMatches = displayedMatches.reduce((acc, match) => {
    const leagueId = match.league.id;
    if (!acc[leagueId]) {
      acc[leagueId] = {
        logo: match.league.logo,
        name: match.league.name,
        matches: [],
      };
    }
    acc[leagueId].matches.push(match);
    return acc;
  }, {});

  const leagueIds = Object.keys(groupedMatches);

  return (
    <div className="rounded-[2rem] pb-4">
      {/* <h2 className='text-5xl text-green-600 font-bold py-6 ml-4 mt-8'>Các trận đấu sắp diễn ra</h2> */}
      {leagueIds.map((leagueId, index) => {
        const league = groupedMatches[leagueId];
        return (
          <div
            key={leagueId}
            className={`text-3xl p-2 mb-4 ${
              index < leagueIds.length - 1 ? "border-b-2 " : ""
            }`}
          >
            <div className="flex font-bold text-white py-4 px-6 mb-10 rounded-xl bg-gradient-to-r from-red-500 to-red-900 w-full">
              <span>{league.name}</span>
              {/* <span className="ml-auto mr-8">Dự đoán</span> */}
            </div>
            {league.matches.map((match) => (
              <div
                key={match.fixture.id}
                className="mt-6 bg-white px-8 flex py-10 cursor-pointer border border-zinc-300 rounded-2xl shadow-lg"
                onClick={() => onMatchClick(match)}
              >
                <div className="flex flex-col items-center border-r-2 my-auto pr-8">
                  <p className="text-black text-2xl font-semibold mb-6">
                    {convertDate(match.fixture.date).formattedTime}
                  </p>
                  <p className="text-black text-2xl">
                    {convertDate(match.fixture.date).formattedDate}
                  </p>
                  {/* <p className="font-semibold">{match.fixture.status.short}</p> */}
                </div>
                <div className="flex flex-row justify-center w-full">
                  <div className="flex justify-center items-center">
                    <img
                      src={match.teams.home.logo}
                      alt={match.teams.home.name}
                      className="w-28 h-28"
                    />
                    <div className="mx-10">
                      <span className="text-2xl -mt-8 flex justify-center font-bold text-red-500">
                        Dự đoán
                      </span>
                      <div className="border mt-2 shadow-xl text-5xl font-bold text-red-700 border-zinc-400 rounded-full px-10 flex justify-center py-4">
                        <span className="">?</span>
                        <span className="mx-6">-</span>
                        <span className="">?</span>
                      </div>
                    </div>
                    <img
                      src={match.teams.away.logo}
                      alt={match.teams.away.name}
                      className="w-28 h-28"
                    />
                  </div>
                </div>
                <button className="border-2 border-red-300 mr-4 rounded-xl px-8 py-2 flex items-center self-center justify-center text-2xl whitespace-nowrap">
                  Xem thêm
                </button>
              </div>
            ))}
          </div>
        );
      })}
      {displayLimit < matches.length && (
        <button
          className="text-2xl flex justify-center mx-auto py-1 px-5 rounded-xl border-2 text-black font-normal mt-4 hover:bg-green-600 hover:text-white"
          onClick={() => setDisplayLimit(displayLimit + 5)}
        >
          Xem thêm
        </button>
      )}
    </div>
  );
}

UpcomingMatches.propTypes = {
  onMatchClick: PropTypes.func.isRequired,
};

export default UpcomingMatches;
