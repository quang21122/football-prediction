import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function PlayersClub({ clubId }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", import.meta.env.VITE_RAPIDAPI_KEY);
        myHeaders.append("x-rapidapi-host", import.meta.env.VITE_RAPIDAPI_HOST);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          `https://v3.football.api-sports.io/players/squads?team=${clubId}`,
          requestOptions
        );

        const data = await response.json();
        const playersData = data.response[0]?.players || []; // Get the players array from the first team object

        localStorage.setItem("playersClub", JSON.stringify(playersData));
        console.log("Players:", JSON.stringify(playersData));

        setPlayers(playersData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [clubId]);

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-red-500 text-3xl">{error.message}</h1>
      </div>
    );
  }

  const totalPages = Math.ceil(players.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const displayedPlayers = players.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="grid grid-cols-4">
        {displayedPlayers.map((player) => (
          <div
            key={player.id}
            className="flex justify-center items-center border border-primary-dark mx-20 my-10 py-4 rounded-2xl"
          >
            <img src={player.photo} alt={player.name} className="w-32 h-32" />
            <div className="ml-4">
              <p className="text-4xl font-semibold">{player.number}</p>
              <p className="whitespace-normal max-w-32 text-2xl font-medium">
                {player.name}
              </p>
              <p className="text-2xl">{player.position}</p>
            </div>
          </div>
        ))}
      </div>
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
    </div>
  );
}

PlayersClub.propTypes = {
  clubId: PropTypes.number.isRequired,
};

export default PlayersClub;
