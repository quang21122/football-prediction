import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ClubDetails() {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/teams?id=${id}`,
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
          setClub(data.response[0]);
          localStorage.setItem("club", JSON.stringify(data.response[0]));
        } else {
          setClub(null);
        }
      } catch (error) {
        console.error("Error fetching club data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchClubData();
  }, [id]);

  return (
    <div>
      {loading && <p>Loading club details...</p>}
      {error && <p>Error fetching club details: {error.message}</p>}
      {club && (
        <div>
          <h1>{club.name}</h1>
          <p>{club.founded}</p>
          <p>{club.venue.name}</p>
          <img src={club.logo} alt={club.name} />
        </div>
      )}
    </div>
  );
}

export default ClubDetails;
