import { useState, useEffect } from 'react';

function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(3);

  useEffect(() => {
    const savedMatches = localStorage.getItem('liveMatchesData');
    console.log(savedMatches);
    if (savedMatches) {
      setMatches(JSON.parse(savedMatches));
    }
  }, []);

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

  if (matches.length === 0) {
    return (
      <div className="flex justify-center h-screen items-center">
        <h1 className="text-3xl">No matches found in localStorage.</h1>
      </div>
    );
  }

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
    <div className='my-6 bg-blue-100 rounded-[2rem] pb-4'>
      <h2 className='text-5xl text-blue-500 font-bold py-6 ml-4'>Các trận đấu đang diễn ra</h2>
      {leagueIds.map((leagueId, index) => {
        const league = groupedMatches[leagueId];
        return (
          <div key={leagueId} className={`text-3xl p-4 mb-4 ${index < leagueIds.length - 1 ? 'border-b-2 border-blue-400' : ''}`}>
            <div className='flex font-bold'>
              <img src={league.logo} alt={league.name} className='h-10 w-10 mr-4'/>
              <span>{league.name}</span>
              <span className='ml-auto mr-8'>Kết quả</span>
            </div>
            {league.matches.map(match => (
              <div key={match.fixture.id} className='mt-4 flex py-4'>
                <div className='flex flex-col items-center border-r-2 border-blue-400 pr-8'>
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
                <div className='flex flex-col justify-around w-full border-r-2 border-blue-400 mr-4'>
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
              className='text-2xl flex justify-center mx-auto py-1 px-5 border-blue-600 rounded-xl border-2 text-black font-normal mt-4 hover:bg-blue-600 hover:text-white'
              onClick={() => setDisplayLimit(displayLimit + 5)}
          >
              Xem thêm
          </button>
      )}
    </div>
  );
}

export default LiveMatches;
