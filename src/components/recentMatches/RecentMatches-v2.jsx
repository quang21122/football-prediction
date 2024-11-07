import { useState } from "react";
import PropTypes from "prop-types";
import RecentMatchesTeams from "./RecentMatches-teams-v2";

function RecentMatches() {
  // useEffect(() => {
  //   setRecentMatches(
  //     JSON.parse(localStorage.getItem("recentMatchesData")) || []
  //   );
  //   console.log(
  //     "Recent matches:",
  //     JSON.parse(localStorage.getItem("recentMatches"))
  //   );
  // }, []);

  // const convertDate = (utcDate) => {
  //   const date = new Date(utcDate);
  //   const formattedDate = date.toLocaleDateString("vi-VN", {
  //     timeZone: "Asia/Ho_Chi_Minh",
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   });
  //   const formattedTime = date.toLocaleTimeString("vi-VN", {
  //     timeZone: "Asia/Ho_Chi_Minh",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  //   return { formattedDate, formattedTime };
  // };

  // if (recentMatches.length === 0) {
  //   return (
  //     <div className="flex justify-center h-screen items-center">
  //       <h1 className="text-3xl">No recent matches found.</h1>
  //     </div>
  //   );
  // }

  // const totalPages = Math.ceil(recentMatches.length / pageSize);
  // const startIndex = (currentPage - 1) * pageSize;
  // const displayedMatches = recentMatches.slice(
  //   startIndex,
  //   startIndex + pageSize
  // );

  // const groupedMatches = displayedMatches.reduce((acc, match) => {
  //   const leagueId = match.league.id;
  //   if (!acc[leagueId]) {
  //     acc[leagueId] = {
  //       logo: match.league.logo,
  //       name: match.league.name,
  //       matches: [],
  //     };
  //   }
  //   acc[leagueId].matches.push(match);
  //   return acc;
  // }, {});

  // const leagueIds = Object.keys(groupedMatches);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };
  const teams = [
    {
      name: "Manchester United",
      data: "recentMatchesData",
    },
    {
      name: "Manchester City",
      data: "recentMatchesData2",
    },
  ];

  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  const handleClick = (team) => {
    selectedTeam == team ? setSelectedTeam(null) : setSelectedTeam(team);
  };

  return (
    <div className="p-6 w-[120rem] mx-auto px-20">
      <div className="border border-zinc-300 shadow-2xl rounded-3xl py-10">
        <div className="flex justify-center items-center flex-row mb-10">
          <div
            className={`w-[20rem] h-[7rem] rounded-b-xl text-5xl font-semibold bg-white -mt-[4.25rem] break-words mr-10 border border-red-600 flex justify-center items-center text-center hover:bg-gradient-to-r from-primary to-primary-dark hover:cursor-pointer hover:text-white ${
              selectedTeam.name == teams[0].name
                ? "bg-gradient-to-r from-primary to-primary-dark text-white"
                : ""
            }`}
            onClick={() => handleClick(teams[0])}
          >
            {teams[0].name}
          </div>
          <div
            className={`w-[20rem] h-[7rem] rounded-b-xl text-5xl font-semibold bg-white -mt-[4.25rem] break-words mr-10 border border-red-600 flex justify-center items-center text-center hover:bg-gradient-to-r from-primary to-primary-dark hover:cursor-pointer hover:text-white ${
              selectedTeam.name == teams[1].name
                ? "bg-gradient-to-r from-primary to-primary-dark text-white"
                : ""
            }`}
            onClick={() => handleClick(teams[1])}
          >
            {teams[1].name}
          </div>
        </div>
        <RecentMatchesTeams data={selectedTeam.data} />
      </div>
    </div>
  );
}

RecentMatches.propTypes = {
  teamId: PropTypes.number.isRequired,
};

export default RecentMatches;
