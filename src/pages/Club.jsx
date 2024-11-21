import { useEffect, useState } from "react";

function ClubDetails() {
  const [clubs, setClubs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/teams?league=61&season=2022`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
              "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        if (data && data.response && data.response.length > 0) {
          setClubs(data.response);
          console.log(JSON.stringify(data.response));
        } else {
          setClubs(null);
        }
      } catch (error) {
        console.error("Error fetching club data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchClubData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">Loading club details...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">
          Error fetching club details: {error.message}
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-[120rem] mx-auto">
        {clubs.map((club) => (
          <div key={club.id}>
            <h1 className="text-black">{club.team.name}</h1>
            <img
              src={club.team.logo}
              alt={club.team.name}
              className="h-10 w-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClubDetails;
