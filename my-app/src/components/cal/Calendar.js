import React, { useState } from 'react';
import "./Calendar.css";

function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());

    const months = [
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
        "December"
    ];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };


    const renderDays = () => {
        const days = [];
        const startOfMonth = new Date(currentYear, currentMonth, 1);
        const firstDayOfMonth = startOfMonth.getDay();
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        let dayOfWeek = 0;

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<td key={i}></td>);
            dayOfWeek = (dayOfWeek + 1) % 7;
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(
                <td
                    key={i + firstDayOfMonth}
                    className={`calendar-date ${i === selectedDate ? "selected" : ""}`}
                    onClick={() => setSelectedDate(i)}
                >
                    {i}
                </td>
            );

            if (dayOfWeek === 6) {
                dayOfWeek = 0;
                days.push(<tr></tr>);
            }
            else
            {
                dayOfWeek = (dayOfWeek + 1) % 7;
            }
        }

            return days;
    };

    const nowOnClick = ()=>{
        let now = new Date();
        console.log(now.getFullYear());
        console.log(now.getMonth());
        //
        setCurrentYear(now.getFullYear());
        setCurrentMonth(now.getMonth());
        setSelectedDate(now.getDate());
    };

    return (
        <div className="calendar">
            <table>
                <thead>
                <tr>
                    <th className="th-pointer" onClick={handlePrevMonth}>{"<"}</th>
                    <th colSpan={4}>
                        {months[currentMonth]} {currentYear}
                    </th>
                    <th className="th-pointer" onClick={nowOnClick}>{"now"}</th>
                    <th className="th-pointer" onClick={handleNextMonth}>{">"}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
                {renderDays()}
                </tbody>
            </table>
        </div>
    );
}

export default Calendar;