import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function UpcomingMatches({ date }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(3);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", import.meta.env.VITE_RAPIDAPI_KEY);
        myHeaders.append("x-rapidapi-host", import.meta.env.VITE_RAPIDAPI_HOST);

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        }

        const response = await fetch(`https://v3.football.api-sports.io/fixtures?date=${date}`, requestOptions);
        const data = await response.json();

        const majorLeagueMatches = data.response.filter(match =>
          [2, 3, 39, 140, 78, 135, 61].includes(match.league.id)
        );

        const upcomingMatches = majorLeagueMatches.filter(match => match.fixture.status.short === 'NS');

        localStorage.setItem('upcomingMatches', JSON.stringify(upcomingMatches));

        setMatches(upcomingMatches);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, [date]);

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
        <h1 className="text-red-500 text-3xl">{error}</h1>
      </div>
    );
  }

  const convertDate = (utcDate) => {
    const date = new Date(utcDate);
    const formattedDate = date.toLocaleDateString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: '2-digit',
        minute: '2-digit',
    });
    return { formattedDate, formattedTime };
  };

  const displayedMatches = matches.slice(0, displayLimit);

  const groupedMatches = displayedMatches.reduce((acc, match) => {
    const leagueId = match.league.id;
    if (!acc[leagueId]) {
      acc[leagueId] = {
        logo: match.league.logo,
        name: match.league.name,
        matches: []
      };
    }
    acc[leagueId].matches.push(match);
    return acc;
  }, {});

  const leagueIds = Object.keys(groupedMatches);

  return (
    <div className=' bg-green-100 rounded-[2rem] pb-4'>
      <h2 className='text-5xl text-green-600 font-bold py-6 ml-4 mt-8'>Các trận đấu sắp diễn ra</h2>
      {leagueIds.map((leagueId, index) => {
        const league = groupedMatches[leagueId];
        return (
          <div key={leagueId} className={`text-3xl p-4 mb-4 ${index < leagueIds.length - 1 ? 'border-b-2 border-green-400' : ''}`}>
            <div className='flex font-bold'>
              <img src={league.logo} alt={league.name} className='h-10 w-10 mr-4'/>
              <span>{league.name}</span>
              <span className='ml-auto mr-8'>Dự đoán</span>
            </div>
            {league.matches.map(match => (
              <div key={match.fixture.id} className='mt-4 flex py-4'>
                <div className='flex flex-col items-center border-r-2 border-green-400 pr-8'>
                  <p className='text-black text-2xl'>
                    {convertDate(match.fixture.date).formattedDate}
                  </p>
                  <p className='text-black text-2xl'>
                    {convertDate(match.fixture.date).formattedTime}
                  </p>
                  <p className='font-semibold'>
                    {match.fixture.status.short}
                  </p>
                </div>
                <div className='flex flex-col justify-around w-full border-r-2 border-green-400 mr-4'>
                  <div className='flex w-full justify-center items-center'>
                    <div className='flex'>
                      <img src={match.teams.home.logo} alt={match.teams.home.name} className='h-8 w-8 mr-4 ml-2'/>
                      <span>{match.teams.home.name}</span>
                    </div>
                    <span className='ml-auto mr-8 font-bold'>{match.goals.home}</span>
                  </div>
                  <div className='flex w-full justify-center items-center'>
                    <div className='flex'>
                      <img src={match.teams.away.logo} alt={match.teams.away.name} className='h-8 w-8 mr-4 ml-2'/>
                      <span>{match.teams.away.name}</span>
                    </div>
                    <span className='ml-auto mr-8 font-bold'>{match.goals.away}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
      {displayLimit < matches.length && (
          <button
              className='text-2xl flex justify-center mx-auto py-1 px-5 border-green-600 rounded-xl border-2 text-black font-normal mt-4 hover:bg-green-600 hover:text-white'
              onClick={() => setDisplayLimit(displayLimit + 5)}
          >
              Xem thêm
          </button>
      )}
    </div>
  );
}

UpcomingMatches.propTypes = {
  date: PropTypes.string.isRequired,
};

export default UpcomingMatches;
