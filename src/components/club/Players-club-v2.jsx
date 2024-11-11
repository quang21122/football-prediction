import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function PlayersClub() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("playersClubData"));
    if (savedData) {
      const filterPlayers = savedData.filter(
        (player) => player.id !== 404656 && player.id !== 307123
      );
      setPlayers(filterPlayers);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">Loading...</h1>
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

export default PlayersClub;
