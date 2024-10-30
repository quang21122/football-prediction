import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import RecentMatches from './RecentMatches-v2';

function MatchDetails({ selectedMatch }) {
    console.log('MatchDetails', selectedMatch);

    const [lineups, setLineups] = useState([]);
    const [playersData, setPlayersData] = useState({});
    const [selectedDetails, setSelectedDetails] = useState('lineups');
    const [headToHead, setHeadToHead] = useState([]);

    useEffect(() => {
        const savedLineups = localStorage.getItem('lineupsData');
        const savedPlayersData = localStorage.getItem('playersData');
        const headToHead = localStorage.getItem('headToHead');
        setLineups(savedLineups ? JSON.parse(savedLineups) : []);
        setPlayersData(savedPlayersData ? JSON.parse(savedPlayersData) : {});
        setHeadToHead(headToHead ? JSON.parse(headToHead) : []);
        console.log('Lineups:', savedLineups);
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

    const groupedMatches = headToHead.reduce((acc, match) => {
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
        <div className="bg-white mx-20 rounded-[3rem]">
            <h2 className="flex justify-center text-4xl mt-8 text-green-700 font-semibold">Dự đoán</h2>
            <div className="text-[8rem] text-green-700 flex justify-center gap-x-32 font-bold">
                <span>?</span>
                <span>-</span>
                <span>?</span>
            </div>
            <div className="bg-green-100 mt-10 pt-10">
                <div className='flex justify-center gap-x-12'>
                    <div>
                        <img src={selectedMatch.teams.home.logo} alt={selectedMatch.teams.home.logo} className='w-44 h-44' />
                        <p className='text-4xl text-green-600 font-bold flex justify-center mt-4'>{selectedMatch.teams.home.name}</p>
                    </div>
                    <p className='text-[5rem] flex items-center justify-center text-green-700 font-bold'>VS</p>
                    <div>
                        <img src={selectedMatch.teams.away.logo} alt={selectedMatch.teams.away.logo} className='w-44 h-44' />
                        <p className='text-4xl text-green-600 font-bold flex justify-center mt-4'>{selectedMatch.teams.away.name}</p>
                    </div>
                </div>
                <div className='mt-20 mx-12 text-3xl font-bold'>
                    <div>
                        <span className='text-green-600 mr-3'>Giải đấu:</span>
                        <span>{selectedMatch.league.name}</span>
                    </div>
                    <span className='block text-green-600 my-2'>Thời gian diễn ra:</span>
                    <span className='mr-2'>{convertDate(selectedMatch.fixture.date).formattedTime},</span>
                    <span>{convertDate(selectedMatch.fixture.date).formattedDate}</span>
                </div>
                <div className='gap-x-4 flex justify-around mt-10 text-2xl'>
                    <span 
                        className={`mt-auto cursor-pointer py-4 px-8 ${selectedDetails === 'lineups' ? 'border-b-4 border-green-400' : ''}`}
                        onClick={() => setSelectedDetails('lineups')}>
                            Đội hình
                    </span>
                    <span 
                        className={`text-wrap text-center cursor-pointer w-24 ${selectedDetails === 'h2h' ? 'border-b-4 border-green-400' : ''}` }
                        onClick={() => setSelectedDetails('h2h')}>
                            Lịch sử đối đầu
                    </span>
                    <span 
                        className={`text-wrap text-center cursor-pointer w-32 ${selectedDetails === 'recent' ? 'border-b-4 border-green-400' : ''}` }
                        onClick={() => setSelectedDetails('recent')}>
                        Các trận gần đây
                    </span>
                </div>
            </div>
            {selectedDetails === 'lineups' && lineups.length > 0 && (
                <div className="bg-green-50 p-8 m-6 mt-12 rounded-[3rem]">
                    <h3 className="text-3xl font-bold text-green-700 mb-6">Đội hình ra sân</h3>
                    <div className="flex justify-around">
                        {lineups.map((teamLineup, index) => (
                            <div key={index} className="w-1/2">
                                <h4 className="text-2xl font-bold text-green-600 mb-4">{teamLineup.team.name}</h4>
                                <img src={teamLineup.team.logo} alt={teamLineup.team.name} className="w-20 h-20 mb-4" />
                                <p className="text-xl font-bold text-gray-700 mb-2">Huấn luyện viên: {teamLineup.coach.name}</p>
                                    
                                {/* Starting XI */}
                                <h5 className="text-xl font-semibold text-green-600 my-4">Đội hình xuất phát</h5>
                                <ul className="space-y-4">
                                    {teamLineup.startXI.map((player, playerIndex) => (
                                        <li key={playerIndex} className="flex items-center space-x-4">
                                            <img
                                                src={playersData[player.player.id] || 'https://via.placeholder.com/50'}
                                                alt={player.player.name}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <span className="font-semibold">{player.player.number}</span>
                                            <span>{player.player.name}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Substitutes */}
                                <h5 className="text-xl font-semibold text-green-600 my-4">Cầu thủ dự bị</h5>
                                <ul className="space-y-4">
                                    {teamLineup.substitutes.map((sub, subIndex) => (
                                        <li key={subIndex} className="flex items-center space-x-4">
                                            <img
                                                src={playersData[sub.player.id] || 'https://via.placeholder.com/50'}
                                                alt={sub.player.name}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <span className="font-semibold">{sub.player.number}</span>
                                            <span>{sub.player.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {selectedDetails === 'h2h' && (
                <div className="bg-green-50 p-8 m-6 mt-12 rounded-[3rem]">
                    {leagueIds.map((leagueId, index) => {
                        const league = groupedMatches[leagueId];
                        return (
                            <div key={leagueId} className={`text-3xl mb-4 ${index < leagueIds.length - 1 ? 'border-b-2 border-green-400' : ''}`}>
                                <div className='flex font-bold'>
                                    <img src={league.logo} alt={league.name} className='h-10 w-10 mr-4'/>
                                    <span>{league.name}</span>
                                    <span className='ml-auto mr-8'>Kết quả</span>
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
                                        <div className='flex flex-col justify-around w-full border-r-2 border-green-400 mr-2'>
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
                </div>
            )}
            {/* {selectedDetails === 'recent' && <RecentMatches teamId={40} />} */}
            {selectedDetails === 'recent' && (
                <div>
                    <h2 className='text-4xl ml-8 my-8 text-green-600 font-bold'>{selectedMatch.teams.home.name}</h2>
                    <RecentMatches />
                    <h2 className='text-4xl ml-8 my-8 text-green-600 font-bold'>{selectedMatch.teams.away.name}</h2>
                    <RecentMatches />
                </div>
            )}
        </div>
    );
}

MatchDetails.propTypes = {
    selectedMatch: PropTypes.object.isRequired,
};

export default MatchDetails;
