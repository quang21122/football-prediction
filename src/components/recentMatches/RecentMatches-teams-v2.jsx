import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function RecentMatchesTeams({ data }) {
  const [recentMatches, setRecentMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setCurrentPage(1);
    setRecentMatches(JSON.parse(localStorage.getItem(data)) || []);
  }, [data]);

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

  if (recentMatches.length === 0) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">No recent matches found.</h1>
      </div>
    );
  }

  const totalPages = Math.ceil(recentMatches.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const displayedMatches = recentMatches.slice(
    startIndex,
    startIndex + pageSize
  );

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {leagueIds.map((leagueId) => {
        const league = groupedMatches[leagueId];
        return (
          <div key={leagueId} className={`text-3xl mb-4 `}>
            {league.matches.map((match) => (
              <div
                key={match.fixture.id}
                className="grid md:grid-cols-[1fr_auto_1fr] mx-20 border-y border-zinc-200 mt-8 py-6"
              >
                <div className="flex my-auto font-medium">
                  <span>{league.name}</span>
                </div>
                <div className="flex py-4 my-auto">
                  <div className="w-full grid md:grid-cols-[3fr_auto_3fr] space-x-8">
                    <div className="flex items-center justify-end">
                      <div className="flex space-x-8">
                        <span className=" flex items-center">
                          {match.teams.home.name}
                        </span>
                        <img
                          src={match.teams.home.logo}
                          alt={match.teams.home.name}
                          className="h-20 w-20"
                        />
                      </div>
                    </div>
                    <div className="w-52 flex justify-center">
                      <div className="border space-x-4 mt-2 shadow-xl text-5xl font-bold text-primary-dark border-zinc-400 rounded-2xl px-10 flex py-4">
                        <span className="">{match.goals.home}</span>
                        <span className="">-</span>
                        <span className="">{match.goals.away}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex space-x-8">
                        <img
                          src={match.teams.away.logo}
                          alt={match.teams.away.name}
                          className="h-20 w-20"
                        />
                        <span className=" flex items-center">
                          {match.teams.away.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center ml-auto">
                  <p className="text-black text-2xl">
                    {convertDate(match.fixture.date).formattedDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-2xl px-3 py-2 rounded-xl border-2 border-zinc-300 font-normal hover:bg-red-600 hover:text-white disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`text-2xl px-4 py-2 rounded-xl border-2 border-zinc-300 ${
              currentPage === i + 1
                ? "bg-red-600 text-white"
                : "hover:bg-red-600 hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-2xl px-3 py-2 rounded-xl border-2 border-zinc-300 font-normal hover:bg-red-600 hover:text-white disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    </>
  );
}

RecentMatchesTeams.propTypes = {
  data: PropTypes.string.isRequired,
};

export default RecentMatchesTeams;
