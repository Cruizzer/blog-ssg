"use client";

import React, { useState } from "react";

const WeeksToDie = () => {
    const [birthdayYear, setBirthdayYear] = useState("");
    const [birthdayMonth, setBirthdayMonth] = useState("");
    const [birthdayDay, setBirthdayDay] = useState("");
    const [isWeekElapsed, setIsWeekElapsed] = useState(0); // Initialize with 0

    // Create a 2D array to represent the grid
    const grid = Array.from({ length: 52 }, () => Array(90).fill(null)); // Reduced the number of columns
    console.log(grid);

    const handleSubmit = () => {
        const currentDate = new Date();
        const birthDate = new Date(
            parseInt(birthdayYear),
            parseInt(birthdayMonth) - 1,
            parseInt(birthdayDay)
        );

        // console.log("This is the birthdate", birthDate);

        if (isNaN(birthDate.getTime())) {
            console.error("Invalid date input");
            return;
        }

        const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
        const weeksElapsed = Math.floor(
            (currentDate.getTime() - birthDate.getTime()) / millisecondsInWeek
        );

        setIsWeekElapsed(weeksElapsed);
        console.log("Weeks Elapsed:", weeksElapsed);
    };

    return (
        <div>
            <div className="flex justify-center items-center mb-4">
                <label className="mr-2">Year:</label>
                <input
                    type="text"
                    value={birthdayYear}
                    onChange={(e) => setBirthdayYear(e.target.value)}
                    placeholder="YYYY"
                    className="border p-1 w-16"
                />

                <label className="mx-2">Month:</label>
                <input
                    type="text"
                    value={birthdayMonth}
                    onChange={(e) => setBirthdayMonth(e.target.value)}
                    placeholder="MM"
                    className="border p-1 w-12"
                />

                <label className="mx-2">Day:</label>
                <input
                    type="text"
                    value={birthdayDay}
                    onChange={(e) => setBirthdayDay(e.target.value)}
                    placeholder="DD"
                    className="border p-1 w-12"
                />

                <button
                    onClick={handleSubmit}
                    className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Submit
                </button>
            </div>

            <div className="grid gap-2.5 sm:gap-2.5 md:gap-2.5 lg:gap-2.5 mt-5 w-full grid-cols-[repeat(26,minmax(0,1fr))] sm:grid-cols-[repeat(26,minmax(0,1fr))] md:grid-cols-[repeat(52,minmax(3.5px,1fr))] lg:grid-cols-[repeat(52,minmax(4px,1fr))]">
                {grid.map((row, rowIndex) =>
                    row.map((_, columnIndex) => {
                        // console.log(row, rowIndex);

                        const weekNumber = rowIndex * 90 + columnIndex + 1;

                        return (
                            <div
                                key={`${rowIndex}-${columnIndex}`}
                                className={`grid-cell w-3 h-3 sm:w-3 sm:h-3 md:w-[11px] md:h-[11px] lg:w-3 lg:h-3 ${
                                    isWeekElapsed >= weekNumber
                                        ? "bg-red-500"
                                        : ""
                                }`}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default WeeksToDie;
