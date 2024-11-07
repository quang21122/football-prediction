import { useState } from "react";
import PropTypes from "prop-types";
import RecentMatchesTeams from "./RecentMatches-teams";

function RecentMatches({ home, away }) {
  // const teams = [
  //   {
  //     name: "Manchester United",
  //     data: "recentMatchesData",
  //   },
  //   {
  //     name: "Manchester City",
  //     data: "recentMatchesData2",
  //   },
  // ];

  const [selectedTeam, setSelectedTeam] = useState(home);

  const handleClick = (team) => {
    selectedTeam == team ? setSelectedTeam(null) : setSelectedTeam(team);
  };

  return (
    <div className="p-6 w-[120rem] mx-auto px-20">
      <div className="border border-zinc-300 shadow-2xl rounded-3xl py-10">
        <div className="flex justify-center items-center flex-row mb-10">
          <div
            className={`w-[20rem] h-[7rem] rounded-b-xl text-5xl font-semibold bg-white -mt-[4.25rem] break-words mr-10 border border-red-600 flex justify-center items-center text-center hover:bg-gradient-to-r from-primary to-primary-dark hover:cursor-pointer hover:text-white ${
              selectedTeam.name == home.name
                ? "bg-gradient-to-r from-primary to-primary-dark text-white"
                : ""
            }`}
            onClick={() => handleClick(home)}
          >
            {home.name}
          </div>
          <div
            className={`w-[20rem] h-[7rem] rounded-b-xl text-5xl font-semibold bg-white -mt-[4.25rem] break-words mr-10 border border-red-600 flex justify-center items-center text-center hover:bg-gradient-to-r from-primary to-primary-dark hover:cursor-pointer hover:text-white ${
              selectedTeam.name == away.name
                ? "bg-gradient-to-r from-primary to-primary-dark text-white"
                : ""
            }`}
            onClick={() => handleClick(away)}
          >
            {away.name}
          </div>
        </div>
        {/* <RecentMatchesTeams data={selectedTeam.data} /> */}
        <RecentMatchesTeams teamId={selectedTeam.id} />
      </div>
    </div>
  );
}

RecentMatches.propTypes = {
  home: PropTypes.object.isRequired,
  away: PropTypes.object.isRequired,
};

export default RecentMatches;
