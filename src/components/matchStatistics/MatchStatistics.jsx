import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Loading from "../loading";

function MatchStatistics({ matchId }) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const translatedStats = {
    "Shots on Goal": "Cú sút trúng mục tiêu",
    "Shots off Goal": "Cú sút ra ngoài",
    "Total Shots": "Tổng số cú sút",
    "Blocked Shots": "Cú sút bị chặn",
    "Shots insidebox": "Cú sút trong vòng cấm",
    "Shots outsidebox": "Cú sút ngoài vòng cấm",
    Fouls: "Số lần phạm lỗi",
    "Corner Kicks": "Số quả phạt góc",
    Offsides: "Số lần việt vị",
    "Ball Possession": "Tỷ lệ kiểm soát bóng",
    "Yellow Cards": "Thẻ vàng",
    "Goalkeeper Saves": "Cứu thua",
    "Total passes": "Tổng số đường chuyền",
    "Passes accurate": "Số đường chuyền chính xác",
    "Passes %": "Tỷ lệ đường chuyền chính xác",
    expected_goals: "Kỳ vọng ghi bàn",
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      setError(null);
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
          `https://v3.football.api-sports.io/fixtures/statistics?fixture=${matchId}`,
          requestOptions
        );

        const data = await response.json();
        console.log("API Response:", data);

        if (!data.response || !Array.isArray(data.response)) {
          setError("No valid data received from API.");
          setLoading(false);
          return;
        }

        const filteredStats = data.response.map((team) => ({
          ...team,
          statistics: team.statistics.filter(
            (stat) =>
              stat.type !== "Red Cards" && stat.type !== "goals_prevented"
          ),
        }));

        setStats(filteredStats);
        localStorage.setItem("statistics", JSON.stringify(data.response));
      } catch (error) {
        setError("Error fetching statistics. Please try again later.");
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, [matchId]);

  const stats1 =
    stats[0]?.statistics.slice(0, Math.ceil(stats[0]?.statistics.length / 2)) ||
    [];
  const stats2 =
    stats[0]?.statistics.slice(Math.ceil(stats[0]?.statistics.length / 2)) ||
    [];

  // Hàm để tính tỷ lệ width
  const getWidth = (value1, value2) => {
    if (
      typeof value1 === "string" &&
      value1.includes("%") &&
      typeof value2 === "string" &&
      value2.includes("%")
    ) {
      const num1 = parseFloat(value1);
      const num2 = parseFloat(value2);
      const total = num1 + num2;
      return [(num1 / total) * 100, (num2 / total) * 100];
    } else {
      const num1 = Number(value1);
      const num2 = Number(value2);
      const total = num1 + num2;
      return [(num1 / total) * 100, (num2 / total) * 100];
    }
  };

  const getVietnameseName = (type) => {
    return translatedStats[type] || type;
  };

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <Loading />
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

  return (
    <div className="p-6 w-[120rem] mx-auto px-20">
      <div className="border border-zinc-300 shadow-2xl rounded-3xl grid md:grid-cols-[1fr_auto_1fr] gap-20 py-10">
        {/* Cột 1 */}
        <div className="space-y-6 mx-10">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-6">
              <img
                src={stats[0]?.team.logo}
                alt="team-logo"
                className="h-20 w-20"
              />
              <span className="text-3xl font-semibold">
                {stats[0]?.team.name}
              </span>
            </div>
            <div className="flex items-center gap-x-6">
              <span className="text-3xl font-semibold">
                {stats[1]?.team.name}
              </span>
              <img
                src={stats[1]?.team.logo}
                alt="team-logo"
                className="h-20 w-20"
              />
            </div>
          </div>
          {stats1
            .filter((stat, index) => {
              const value1 = stat.value;
              const value2 = stats[1]?.statistics[index]?.value;
              return value1 !== "0" && value2 !== "0";
            })
            .map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center text-2xl text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{stat.value}</span>
                  </div>
                  <span className="text-xl">
                    {getVietnameseName(stat.type)}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {stats[1]?.statistics[index]?.value}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 h-2">
                  {(() => {
                    const [width1, width2] = getWidth(
                      stat.value,
                      stats[1]?.statistics[index]?.value
                    );
                    return (
                      <>
                        <div
                          className="bg-primary rounded-full"
                          style={{ width: `${width1}%` }}
                        />
                        <div
                          className="bg-primary-dark rounded-full"
                          style={{ width: `${width2}%` }}
                        />
                      </>
                    );
                  })()}
                </div>
              </div>
            ))}
        </div>
        <div className="bg-zinc-100 w-1 mx-auto"></div>
        {/* Cột 2 */}
        <div className="space-y-6 mx-10">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-6">
              <img
                src={stats[0]?.team.logo}
                alt="team-logo"
                className="h-20 w-20"
              />
              <span className="text-3xl font-semibold">
                {stats[0]?.team.name}
              </span>
            </div>
            <div className="flex items-center gap-x-6">
              <span className="text-3xl font-semibold">
                {stats[1]?.team.name}
              </span>
              <img
                src={stats[1]?.team.logo}
                alt="team-logo"
                className="h-20 w-20"
              />
            </div>
          </div>
          {stats2
            .filter((stat, index) => {
              const value1 = stat.value;
              const value2 = stats[1]?.statistics[index + stats1.length]?.value;
              return value1 !== "0" && value2 !== "0";
            })
            .map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center text-2xl text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{stat.value}</span>
                  </div>
                  <span className="text-xl">
                    {getVietnameseName(stat.type)}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {stats[1]?.statistics[index + stats1.length]?.value}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 h-2">
                  {(() => {
                    const [width1, width2] = getWidth(
                      stat.value,
                      stats[1]?.statistics[index + stats1.length]?.value
                    );
                    return (
                      <>
                        <div
                          className="bg-primary rounded-full"
                          style={{ width: `${width1}%` }}
                        />
                        <div
                          className="bg-primary-dark rounded-full"
                          style={{ width: `${width2}%` }}
                        />
                      </>
                    );
                  })()}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

MatchStatistics.propTypes = {
  matchId: PropTypes.number.isRequired,
};

export default MatchStatistics;
