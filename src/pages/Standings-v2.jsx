import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import FinishedMatches from "../components/standing/FinishedMatches-v2";
import UpcomingMatches from "../components/standing/UpcomingMatches-v2";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import PropTypes from 'prop-types';

const Standings = () => {
  const [standings, setStandings] = useState([]);
  const [leagueName, setLeagueName] = useState("");
  const [displayLimit, setDisplayLimit] = useState(10);

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
    const savedStandings = JSON.parse(localStorage.getItem("standingsData"));
    console.log("Standings data:", savedStandings);
    if (savedStandings && savedStandings[0].league.standings[0]) {
      setStandings(savedStandings[0].league.standings[0]);
      setLeagueName(savedStandings[0].league.name);
    }
  }, []);

  return (
    <div className="grid grid-cols-[3.8fr_6.2fr] py-10 gap-x-20 max-w-[120rem] mx-auto border border-x-2 border-gray-200">
      <div className="w-full">
        <h1 className="flex justify-center items-center text-center font-semibold text-red-600 text-3xl mb-6">
          Các trận đấu của mùa giải sắp diễn ra
        </h1>
        <UpcomingMatches />
        <h1 className="flex justify-center items-center text-center font-semibold text-red-600 text-3xl mb-6 mt-20">
          Các trận đấu của mùa giải đã kết thúc
        </h1>
        <FinishedMatches />
      </div>
      <div className="">
        <div
          className="py-6 rounded-[2.5rem] bg-gradient-to-r from-primary to-primary-dark
      text-white text-5xl font-bold text-center flex flex-row justify-between items-center px-10 w-[94%]"
        >
          <GrFormPrevious className="text-5xl hover:cursor-pointer hover:text-black" />
          {leagueName}
          <GrFormNext className="text-5xl hover:cursor-pointer hover:text-black" />
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
                    className="w-12 h-12 mr-4"
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
