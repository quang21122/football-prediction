import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import FinishedMatches from "../components/standing/FinishedMatches";
import UpcomingMatches from "../components/standing/UpcomingMatches";

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leagueName, setLeagueName] = useState("");
  const [displayLimit, setDisplayLimit] = useState(10);
  const [leagueId, setLeagueId] = useState(39);

  const leagueIds = [39, 78, 61, 140, 135];

  const leaderboardArr = [
    " ",
    " ",
    "ST",
    "T",
    "H",
    "B",
    "BT",
    "BB",
    "+/-",
    "Đ",
  ];

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/standings?season=2022&league=${leagueId}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
              "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
            },
          }
        );
        const data = await response.json();
        console.log(JSON.stringify(data.response));
        if (data.response && data.response.length > 0) {
          setStandings(data.response[0].league.standings[0]);
          setLeagueName(data.response[0].league.name);
        } else {
          setError(new Error("No standings data found."));
        }
      } catch (error) {
        console.error("Error fetching standings:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [leagueId]);

  const handleNextLeague = () => {
    const currentIndex = leagueIds.indexOf(leagueId);
    const nextIndex = (currentIndex + 1) % leagueIds.length;
    setLeagueId(leagueIds[nextIndex]);
  };

  const handlePreviousLeague = () => {
    const currentIndex = leagueIds.indexOf(leagueId);
    const previousIndex =
      (currentIndex - 1 + leagueIds.length) % leagueIds.length;
    setLeagueId(leagueIds[previousIndex]);
  };

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">Loading standings...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">Error fetching standings: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[3.8fr_6.2fr] py-10 gap-x-20 max-w-[120rem] mx-auto border border-x-2 border-gray-200">
      <div className="w-full">
        <h1 className="flex justify-center items-center text-center font-semibold text-red-600 text-3xl mb-6">
          Các trận đấu của mùa giải sắp diễn ra
        </h1>
        <UpcomingMatches leagueId={leagueId} />
        <h1 className="flex justify-center items-center text-center font-semibold text-red-600 text-3xl mb-6 mt-20">
          Các trận đấu của mùa giải đã kết thúc
        </h1>
        <FinishedMatches leagueId={leagueId} />
      </div>
      <div className="">
        <div
          className="py-6 rounded-[2.5rem] bg-gradient-to-r from-primary to-primary-dark
      text-white text-5xl font-bold text-center flex flex-row justify-between items-center px-10 w-[94%]"
        >
          <GrFormPrevious
            onClick={handlePreviousLeague}
            className="text-5xl hover:cursor-pointer hover:text-black"
          />
          {leagueName}
          <GrFormNext
            onClick={handleNextLeague}
            className="text-5xl hover:cursor-pointer hover:text-black"
          />
        </div>
        <table className="w-[94%] mt-10 shadow-sm">
          <thead>
            <tr>
              {leaderboardArr.map((item, index) => (
                <th
                  key={index}
                  className="text-center text-3xl bg-red-500 py-3 text-white"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.slice(0, displayLimit).map((team, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "" : "bg-gray-100"
                } text-3xl text-center`}
              >
                <td className="py-7 px-6">{team.rank}</td>
                <td className="py-7 flex flex-row justify-start items-center">
                  <img
                    src={team.team.logo}
                    alt={team.team.name}
                    className="w-12 h-12 mr-6"
                  />
                  {team.team.name}
                </td>
                <td className="py-7 px-6">{team.all.played}</td>
                <td className="py-7 px-6">{team.all.win}</td>
                <td className="py-7 px-6">{team.all.draw}</td>
                <td className="py-7 px-6">{team.all.lose}</td>
                <td className="py-7 px-6">{team.all.goals.for}</td>
                <td className="py-7 px-6">{team.all.goals.against}</td>
                <td className="py-7 px-6">
                  {team.all.goals.for - team.all.goals.against >= 0
                    ? "+" + (team.all.goals.for - team.all.goals.against)
                    : "-" + (team.all.goals.against - team.all.goals.for)}
                </td>
                <td className="py-7 px-6">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="grid grid-cols-4 text-3xl text-red-500 ml-40 mt-10">
          <div className="flex flex-col">
            <p>ST: Số trận</p>
            <p>BT: Bàn thắng</p>
          </div>
          <div className="flex flex-col">
            <p>T: Thắng</p>
            <p>BB: Bàn bại</p>
          </div>
          <div className="flex flex-col">
            <p>H: Hòa</p>
            <p>+/-: Hiệu số</p>
          </div>
          <div className="flex flex-col">
            <p>B: Bại</p>
            <p>Đ: Điểm</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {standings.length > displayLimit && (
            <button
              onClick={() => setDisplayLimit(displayLimit + 10)}
              className="text-3xl border border-red-300 py-6 px-8 mt-12 rounded-full hover:bg-red-500 hover:text-white"
            >
              Xem thêm
            </button>
          )}
          {standings.length <= displayLimit && (
            <button
              onClick={() => setDisplayLimit(10)}
              className="text-3xl border border-red-300 py-6 px-8 mt-12 rounded-full hover:bg-red-500 hover:text-white"
            >
              Rút gọn
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Standings;
