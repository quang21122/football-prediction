import PropTypes from 'prop-types';

function MatchDetails({ selectedMatch }) {
    console.log('MatchDetails', selectedMatch);

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

    return (
        <div className="bg-white mx-20 rounded-[3rem]">
            <h2 className="flex justify-center text-4xl mt-8 text-green-700 font-semibold">Dự đoán</h2>
            <div className="text-[8rem] text-green-700 flex justify-center gap-x-32 font-bold">
                <span>?</span>
                <span>-</span>
                <span>?</span>
            </div>
            <div className="bg-green-100 mt-16 pt-10">
                <div className=''>
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
                            <span className=''>{selectedMatch.league.name}</span>
                        </div>
                        <span className='block text-green-600 my-2'>Thời gian diễn ra:</span>
                        <span className='mr-2'>{convertDate(selectedMatch.fixture.date).formattedTime},</span>
                        <span>{convertDate(selectedMatch.fixture.date).formattedDate}</span>
                    </div>
                    <div className='gap-x-4 flex justify-around mt-10 text-2xl'>
                        <span>Đội hình</span>
                        <span className='text-wrap text-center w-24'>Lịch sử đối đầu</span>
                        <span className='text-wrap text-center w-32'>Các trận gần đây</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

MatchDetails.propTypes = {
    selectedMatch: PropTypes.object.isRequired,
};

export default MatchDetails;
