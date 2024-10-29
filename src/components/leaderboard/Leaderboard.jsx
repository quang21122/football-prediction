import React, { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const Team = {
    rank: Number,
    team: {
        id: Number,
        name: String,
        logo: String
    },
    points: Number,
    goalsDifference: Number,
    played: Number
};

const League = {
    id: Number,
    name: String,
    standings: [Team]
};

const exampleTeams = [
    {
        rank: 1,
        team: {
            id: 101,
            name: 'Manchester City',
            logo: 'https://media-3.api-sports.io/football/teams/33.png'
        },
        points: 86,
        goalsDifference: 45,
        played: 38
    },
    {
        rank: 2,
        team: {
            id: 102,
            name: 'Liverpool',
            logo: 'https://media-3.api-sports.io/football/teams/33.png'
        },
        points: 84,
        goalsDifference: 40,
        played: 38
    },
    {
        rank: 3,
        team: {
            id: 103,
            name: 'Chelsea',
            logo: 'https://media-3.api-sports.io/football/teams/33.png'
        },
        points: 74,
        goalsDifference: 30,
        played: 38
    },
    {
        rank: 4,
        team: {
            id: 104,
            name: 'Tottenham Hotspur',
            logo: 'https://media-3.api-sports.io/football/teams/33.png'
        },
        points: 70,
        goalsDifference: 25,
        played: 38
    },
    {
        rank: 5,
        team: {
            id: 105,
            name: 'Arsenal',
            logo: 'https://media-3.api-sports.io/football/teams/33.png'
        },
        points: 66,
        goalsDifference: 20,
        played: 38
    },
    {
        rank: 6,
        team: {
            id: 106,
            name: 'Manchester United',
            logo: 'https://media-3.api-sports.io/football/teams/33.png'
        },
        points: 64,
        goalsDifference: 15,
        played: 38
    },
    {
        rank: 7,
        team: {
            id: 107,
            name: 'Leicester City',
            logo: 'https://media-1.api-sports.io/football/teams/50.png'
        },
        points: 62,
        goalsDifference: 10,
        played: 38
    },
    {
        rank: 8,
        team: {
            id: 108,
            name: 'West Ham United',
            logo: 'https://media-1.api-sports.io/football/teams/50.png'
        },
        points: 61,
        goalsDifference: 5,
        played: 38
    },
    {
        rank: 9,
        team: {
            id: 109,
            name: 'Everton',
            logo: 'https://media-1.api-sports.io/football/teams/50.png'
        },
        points: 59,
        goalsDifference: 0,
        played: 38
    },
    {
        rank: 10,
        team: {
            id: 110,
            name: 'Brentford',
            logo: 'https://media-1.api-sports.io/football/teams/50.png'
        },
        points: 56,
        goalsDifference: -5,
        played: 38
    },
    {
        rank: 11,
        team: {
            id: 111,
            name: 'Southampton',
            logo: 'https://media-1.api-sports.io/football/teams/50.png'
        },
        points: 54,
        goalsDifference: -10,
        played: 38
    },
    {
        rank: 12,
        team: {
            id: 112,
            name: 'Wolverhampton Wanderers',
            logo: 'https://media-1.api-sports.io/football/teams/50.png'
        },
        points: 52,
        goalsDifference: -15,
        played: 38
    },
    {
        rank: 13,
        team: {
            id: 113,
            name: 'Crystal Palace',
            logo: 'https://media-1.api-sports.io/football/teams/50.png'
        },
        points: 50,
        goalsDifference: -20,
        played: 38
    },
    {
        rank: 14,
        team: {
            id: 114,
            name: 'Newcastle United',
            logo: 'https://media-1.api-sports.io/football/teams/50.png'
        },
        points: 48,
        goalsDifference: -25,
        played: 38
    },
    {
        rank: 15,
        team: {
            id: 115,
            name: 'Brighton & Hove Albion',
            logo: 'https://media-1.api-sports.io/football/teams/50.png'
        },
        points: 46,
        goalsDifference: -30,
        played: 38
    },
    {
        rank: 16,
        team: {
            id: 116,
            name: 'Aston Villa',
            logo: 'https://media-1.api-sports.io/football/teams/50.png'
        },
        points: 44,
        goalsDifference: -35,
        played: 38
    },
    {
        rank: 17,
        team: {
            id: 117,
            name: 'Leeds United',
            logo: 'https://media-1.api-sports.io/football/teams/50.png'
        },
        points: 42,
        goalsDifference: -40,
        played: 38
    },
];

const exampleTeams2 = [
    {
        rank: 1,
        team: {
            id: 201,
            name: 'Real Madrid',
            logo: 'https://media-1.api-sports.io/football/teams/541.png'
        },
        points: 88,
        goalsDifference: 50,
        played: 38
    },
    {
        rank: 2,
        team: {
            id: 202,
            name: 'Barcelona',
            logo: 'https://media-1.api-sports.io/football/teams/541.png'
        },
        points: 86,
        goalsDifference: 45,
        played: 38
    },
    {
        rank: 3,
        team: {
            id: 203,
            name: 'Atletico Madrid',
            logo: 'https://media-1.api-sports.io/football/teams/541.png'
        },
        points: 78,
        goalsDifference: 35,
        played: 38
    },
];

const exampleTeams3 = [
    {
        rank: 1,
        team: {
            id: 301,
            name: 'Inter Milan',
            logo: 'https://media-1.api-sports.io/football/teams/109.png'
        },
        points: 90,
        goalsDifference: 55,
        played: 38
    },
    {
        rank: 2,
        team: {
            id: 302,
            name: 'AC Milan',
            logo: 'https://media-1.api-sports.io/football/teams/109.png'
        },
        points: 88,
        goalsDifference: 50,
        played: 38
    },
    {
        rank: 3,
        team: {
            id: 303,
            name: 'Juventus',
            logo: 'https://media-1.api-sports.io/football/teams/109.png'
        },
        points: 80,
        goalsDifference: 40,
        played: 38
    },
];

const exampleTeams4 = [
    {
        rank: 1,
        team: {
            id: 401,
            name: 'Bayern Munich',
            logo: 'https://media-1.api-sports.io/football/teams/157.png'
        },
        points: 92,
        goalsDifference: 60,
        played: 38
    },
    {
        rank: 2,
        team: {
            id: 402,
            name: 'Borussia Dortmund',
            logo: 'https://media-1.api-sports.io/football/teams/157.png'
        },
        points: 90,
        goalsDifference: 55,
        played: 38
    }
];

const exampleLeagues = [
    {
        id: 1,
        name: 'Premier League',
        standings: exampleTeams
    },
    {
        id: 2,
        name: 'La Liga',
        standings: exampleTeams2
    },
    {
        id: 3,
        name: 'Serie A',
        standings: exampleTeams3
    },
    {
        id: 4,
        name: 'Bundesliga',
        standings: exampleTeams4
    }
];

function Leaderboard() {
    const leaderboardArr = ['Rank', 'Club', 'Pl', 'GD', 'Pts'];
    const [displayLimit, setDisplayLimit] = useState(10);
    const [currentLeagueIndex, setCurrentLeagueIndex] = useState(0);

    const handleNextLeague = () => {
        setCurrentLeagueIndex((prevIndex) => (prevIndex + 1) % exampleLeagues.length);
        setDisplayLimit(10);
    };

    const handlePreviousLeague = () => {
        setCurrentLeagueIndex((prevIndex) => (prevIndex - 1 + exampleLeagues.length) % exampleLeagues.length);
        setDisplayLimit(10);
    };

    return (
        <div className='pl-10 pt-5'>
            <div className='w-[90%] rounded-[6rem] bg-white'>
                <div className="text-6xl font-bold py-8 flex flex-row w-full justify-center">
                    <div className="items-start">
                        <GrFormPrevious className='cursor-pointer text-black' onClick={handlePreviousLeague} />
                    </div>
                    <div className="text-green-600 px-8">
                        {exampleLeagues[currentLeagueIndex].name}
                    </div>
                    <div className="items-end">
                        <GrFormNext className='cursor-pointer text-black' onClick={handleNextLeague} />
                    </div>
                </div>
                <table className='w-[100%] border border-collapse border-gray-200'>
                    <thead>
                        <tr>
                            {leaderboardArr.map((item, index) => (
                                <th key={index} className='text-3xl font-semibold px-10 py-4 bg-green-100'>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {exampleLeagues[currentLeagueIndex].standings.slice(0, displayLimit).map((team, index) => (
                            <tr key={index} className='text-[1.5rem] border border-collapse border-gray-200'>
                                <td className='py-5 text-center'>{team.rank}</td>
                                <td className='flex items-center py-5'>
                                    <img src={team.team.logo} alt={team.team.name} className='w-12 h-12 mr-4' />
                                    {team.team.name}
                                </td>
                                <td className='py-5 text-center'>{team.played}</td>
                                <td className='py-5 text-center'>
                                    {team.goalsDifference > 0 ? `+${team.goalsDifference}` : team.goalsDifference}
                                </td>
                                <td className='py-5 text-center'>{team.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-center items-center py-8'>
                    {displayLimit < exampleLeagues[currentLeagueIndex].standings.length && (
                        <button
                            className='text-2xl flex justify-center items-center mx-auto py-1 px-5 border-green-600 rounded-xl border-2 text-black font-normal mt-4 hover:bg-green-600 hover:text-white'
                            onClick={() => setDisplayLimit(displayLimit + (exampleLeagues[currentLeagueIndex].standings.length - displayLimit))} // Increase display limit by 5
                            >
                            Xem thêm
                        </button>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Leaderboard