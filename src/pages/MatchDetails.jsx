// MatchDetails.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

function MatchDetails() {
  const { id } = useParams(); // Retrieve match ID from the URL
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const savedMatches = JSON.parse(
      localStorage.getItem("upcomingMatchesData")
    );
    if (savedMatches) {
      const selectedMatch = savedMatches.find(
        (m) => m.fixture.id === parseInt(id)
      );
      setMatch(selectedMatch);
      console.log(selectedMatch);
    }
  }, [id]);

  if (!match) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">Match not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-[120rem] mx-auto bg-primary-dark text-white text-2xl pt-4 pl-4">
        <div className="flex">
          <Link to="/" className="mr-4 block hover:underline">
            Lịch thi đấu
          </Link>
          <div className="flex items-center ">
            <FaChevronRight />
            <p className="ml-4">Chi tiết trận đấu</p>
          </div>
        </div>
        <div className="m-10 bg-white rounded-3xl grid grid-cols-[4fr_2fr_4fr]">
          <div className="flex justify-center items-center mt-48 text-black text-4xl font-bold space-x-8">
            <p className="">{match.teams.home.name}</p>
            <img
              src={match.teams.home.logo}
              alt={match.teams.home.name}
              className="w-40 h-40"
            />
          </div>
          <div>
            <div className="text-3xl font-bold px-6 bg-gradient-to-r from-primary to-primary-dark flex justify-center w-80 mx-auto py-4 rounded-b-2xl">
              <h2>{match.league.name}</h2>
            </div>
            <div className="text-black font-medium flex flex-col justify-center items-center my-6">
              <div>
                <span>
                  {new Date(match.fixture.date).toLocaleTimeString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span className="mx-2">-</span>
                <span>
                  {new Date(match.fixture.date).toLocaleDateString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                  })}
                </span>
              </div>
              <div className="mt-2 whitespace-nowrap">
                <span className="mr-3">Sân vận động:</span>
                <span className="">{match.fixture.venue.name}</span>
              </div>
            </div>
            <div className="w-80 mx-auto mt-14">
              <span className="text-3xl -mt-8 flex justify-center font-bold text-primary">
                Dự đoán
              </span>
              <div className="border space-x-10 mt-2 shadow-xl text-5xl font-bold text-primary-dark border-zinc-400 rounded-full px-10 flex justify-center py-6">
                <span className="">?</span>
                <span className="">-</span>
                <span className="">?</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-48 text-black text-4xl font-bold space-x-8">
            <img
              src={match.teams.away.logo}
              alt={match.teams.away.name}
              className="w-40 h-40"
            />
            <p className="">{match.teams.away.name}</p>
          </div>

          <p className="text-2xl text-center mt-4">
            {match.teams.home.name} vs {match.teams.away.name}
          </p>
          <p className="text-xl text-center mt-4">
            Date:{" "}
            {new Date(match.fixture.date).toLocaleDateString("vi-VN", {
              timeZone: "Asia/Ho_Chi_Minh",
            })}
            <br />
            Time:{" "}
            {new Date(match.fixture.date).toLocaleTimeString("vi-VN", {
              timeZone: "Asia/Ho_Chi_Minh",
            })}
          </p>
        </div>
        <div className="flex justify-center gap-x-8 -mt-14">
          <div>
            <h2 className="text-4xl font-semibold bg-primary px-16 py-6 rounded-t-xl">
              Đội hình
            </h2>
          </div>
          <div>
            <h2 className="text-4xl font-semibold bg-primary px-16 py-1 text-center whitespace-normal rounded-t-xl max-w-80">
              Thông số đối đầu
            </h2>
          </div>
          <div>
            <h2 className="text-4xl font-semibold bg-primary px-16 py-1 text-center whitespace-normal rounded-t-xl max-w-80">
              Các trận gần đây
            </h2>
          </div>
          <div>
            <h2 className="text-4xl font-semibold bg-primary px-16 py-1 text-center whitespace-normal rounded-t-xl max-w-80">
              Thống kê sau trận
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchDetails;
