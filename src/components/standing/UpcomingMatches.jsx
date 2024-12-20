// import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GrFormNext } from "react-icons/gr";
import PropTypes from "prop-types";
import dayjs from 'dayjs';

async function fetchMatchesWithPredictionByRange(leagueId, from, to) {
  try {
    const response = await fetch(
      `http://localhost:9000/predict?league=${leagueId}&from=${from}&to=${to}`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching matches with prediction for league ${leagueId}: ${response.status}`
      );
    }
    const data = await response.json();
    return data.matches;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it upstream
  }
}

function UpcomingMatches({ leagueId }) {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of matches per page

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      setError(null);
      try {
        const startDate = dayjs().add(1, 'day').subtract(2, 'year'); // Thêm 1 ngày và lùi 2 năm
        const endDate = startDate.add(10, 'day'); // Thêm 10 ngày so với startDate
        const data = await fetchMatchesWithPredictionByRange(leagueId, startDate, endDate);

        if (data.length > 0) {
          const matches = data.slice(0, 16);
          setMatches(matches);
        } else {
          setError(new Error("No match founded in the next 10 days."));
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [leagueId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-3xl">{error.message}</h1>
      </div>
    );
  }

  const handleMatchClick = (match) => {
    navigate(`/matches/${match.fixture.id}`);
  };

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

  const totalPages = Math.ceil(matches.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const displayedMatches = matches.slice(startIndex, startIndex + pageSize);

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
    <div className="mx-8">
      <div className="bg-white rounded-[2rem] border border-solid border-gray-200 p-2">
        {leagueIds.map((leagueId) => {
          const league = groupedMatches[leagueId];
          return (
            <div key={leagueId}>
              {league.matches.map((match) => (
                <div
                  key={match.fixture.id}
                  className="mt-4 mb-6 mx-4 bg-white grid grid-cols-[2fr_6fr_1.5fr_0.5fr] pt-8 pb-4 border border-zinc-300 rounded-3xl shadow-lg"
                  onClick={() => handleMatchClick(match)}
                >
                  <div className="font-bold text-xl text-center flex items-center justify-center pl-4">
                    <span>{league.name}</span>
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="flex justify-center items-center">
                      <img
                        src={match.teams.home.logo}
                        alt={match.teams.home.name}
                        className="w-10 h-10"
                      />
                      <div className="mx-8">
                        <span className="text-xl -mt-8 flex justify-center font-bold text-primary  ">
                          Dự đoán
                        </span>
                        <div className="border mt-2 shadow-xl text-2xl font-bold text-primary-dark border-zinc-400 rounded-full px-6 flex justify-center py-2">
                          <span className="">{match.predict.home}</span>
                          <span className="mx-6">-</span>
                          <span className="">{match.predict.away}</span>
                        </div>
                      </div>
                      <img
                        src={match.teams.away.logo}
                        alt={match.teams.away.name}
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-black font-semibold text-[1rem]">
                      {convertDate(match.fixture.date).formattedTime}
                    </p>
                    <p className="text-black text-[1rem]">
                      {convertDate(match.fixture.date).formattedDate}
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <GrFormNext className="cursor-pointer text-6xl" />
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {/* Pagination control */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-xl px-3 py-2 rounded-xl border-2 border-zinc-300 font-normal hover:bg-red-600 hover:text-white disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`text-xl px-4 py-2 rounded-xl border-2 border-zinc-300 ${
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
          className="text-xl px-3 py-2 rounded-xl border-2 border-zinc-300 font-normal hover:bg-red-600 hover:text-white disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

UpcomingMatches.propTypes = {
  leagueId: PropTypes.number.isRequired,
};

export default UpcomingMatches;
