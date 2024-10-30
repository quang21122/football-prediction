import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function HeadToHead({ homeTeamId, awayTeamId }) {
    const [headToHead, setHeadToHead] = useState([]);

    useEffect(() => {
        const fetchHeadToHead = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("x-rapidapi-key", import.meta.env.VITE_RAPIDAPI_KEY);
                myHeaders.append("x-rapidapi-host", import.meta.env.VITE_RAPIDAPI_HOST);

                const requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                const response = await fetch(
                    `https://v3.football.api-sports.io/fixtures/headtohead?h2h=${homeTeamId}-${awayTeamId}`,
                    requestOptions
                );
                const data = await response.json();
                const pastMatches = data.response.filter(match => new Date(match.fixture.date) < new Date());

                const sortedMatches = pastMatches.sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));

                setHeadToHead(sortedMatches.slice(0, 5));

                localStorage.setItem('headToHead', JSON.stringify(sortedMatches.slice(0, 5)));
            } catch (error) {
                console.error('Error fetching head-to-head data:', error);
            }
        };

        fetchHeadToHead();
    }, [homeTeamId, awayTeamId]);

    return (
        <div className="bg-green-50 p-8 m-6 mt-12 rounded-[3rem]">
            <h3 className="text-3xl font-bold text-green-700 mb-6">Lịch sử đối đầu</h3>
            <ul className="space-y-4">
                {headToHead.map((match, index) => (
                    <li key={index} className="flex justify-between">
                        <span>{new Date(match.fixture.date).toLocaleDateString()}</span>
                        <span>{match.teams.home.name} {match.goals.home} - {match.goals.away} {match.teams.away.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

HeadToHead.propTypes = {
    homeTeamId: PropTypes.number.isRequired,
    awayTeamId: PropTypes.number.isRequired,
};

export default HeadToHead;
