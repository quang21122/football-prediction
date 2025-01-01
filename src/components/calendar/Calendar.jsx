import React from "react";
import dayjs from "dayjs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export const generateDate = (
  month = dayjs().subtract(2, "year").month(),
  year = dayjs().subtract(2, "year").year()
) => {
  const firstDayOfMonth = dayjs()
    .subtract(2, "year")
    .year(year)
    .month(month)
    .startOf("month");
  const lastDayOfMonth = dayjs()
    .subtract(2, "year")
    .year(year)
    .month(month)
    .endOf("month");
  const days = [];

  // Previous month days
  for (let i = 0; i < firstDayOfMonth.day(); i++) {
    const date = firstDayOfMonth.day(i);
    days.push({
      date,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = firstDayOfMonth.date(); i <= lastDayOfMonth.date(); i++) {
    const date = firstDayOfMonth.date(i);
    const twoYearsAgo = dayjs().subtract(2, "year");
    days.push({
      date,
      isCurrentMonth: true,
      today: twoYearsAgo.isSame(date, "date"),
    });
  }

  const remaining = 42 - days.length;

  for (
    let i = lastDayOfMonth.date() + 1;
    i <= lastDayOfMonth.date() + remaining;
    i++
  ) {
    const date = lastDayOfMonth.date(i);
    days.push({
      date,
      isCurrentMonth: false,
    });
  }

  return days;
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = ({ onDateSelect }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [today, setToday] = React.useState(dayjs().subtract(2, "year"));
  const [selectedDate, setSelectedDate] = React.useState(
    dayjs().subtract(2, "year")
  );
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date); // Call the prop function to pass selectedDate
  };
  return (
    <div className="pl-2 border border-gray-300 rounded-[3rem] shadow-sm">
      <div className="w-[40rem] h-[48rem] rounded-[4.5rem] bg-white">
        <div className="flex items-center justify-center py-1">
          <GrFormPrevious
            className="cursor-pointer text-6xl"
            onClick={() => setToday(today.subtract(1, "month"))}
          />
          <h1 className="text-2xl font-bold py-6 px-20">
            {months[today.month()]} {today.year()}
          </h1>
          <GrFormNext
            className="cursor-pointer text-6xl"
            onClick={() => setToday(today.add(1, "month"))}
          />
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <div
              key={index}
              className="bg-primary flex justify-center items-center h-full py-4 text-xl font-semibold"
            >
              {day}
            </div>
          ))}
          {generateDate(today.month(), today.year()).map((day, index) => (
            <div
              key={index}
              className={`flex justify-center items-center m-3 text-xl h-[4rem] hover:bg-red-300 hover:rounded-full hover:text-white hover:cursor-pointer 
                                        ${
                                          day.isCurrentMonth
                                            ? "text-black"
                                            : "text-gray-300"
                                        } 
                                        ${
                                          day.today
                                            ? "bg-primary rounded-full"
                                            : ""
                                        }
                                        ${
                                          day.date.isSame(selectedDate, "date")
                                            ? "bg-red-500 rounded-full text-white"
                                            : ""
                                        }`}
              onClick={() => handleDateSelect(day.date)}
            >
              {day.date.date()}
            </div>
            // onClick để test
          ))}
        </div>
        <hr className="w-full border-solid border-red-200" />
        <div className="flex items-center py-3 px-10">
          <button
            className="bg-primary rounded-3xl py-4 px-12 text-xl hover:text-white"
            onClick={() => setToday(dayjs())}
          >
            Today
          </button>
        </div>
        {/* Chỗ này test nốt */}
        {/* <div className="">
                    <h1 className='text-center text-xl font-bold'>{selectedDate.format('dddd, MMMM DD, YYYY')}</h1>
                </div> */}
      </div>
    </div>
  );
};

export default Calendar;
