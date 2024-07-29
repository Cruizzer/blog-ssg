"use client";

import React, { useState, useEffect } from "react";
import "./WeeksToDie.css";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";

const WeeksToDie = () => {
    const [birthdayYear, setBirthdayYear] = useState("");
    const [birthdayMonth, setBirthdayMonth] = useState("");
    const [birthdayDay, setBirthdayDay] = useState("");
    const [isWeekElapsed, setIsWeekElapsed] = useState(0); // Initialize with 0
    const [error, setError] = useState("");

    // Create a 2D array to represent the grid

    const handleSubmit = () => {
        const currentDate = new Date();

        // Validate input
        const inputYear = parseInt(birthdayYear);
        const inputMonth = parseInt(birthdayMonth);
        const inputDay = parseInt(birthdayDay);

        if (isNaN(inputYear) || isNaN(inputMonth) || isNaN(inputDay)) {
            setError("Invalid input. Please enter a valid date.");
            return;
        }

        if (
            inputYear < 1900 ||
            inputMonth < 1 ||
            inputMonth > 12 ||
            inputDay < 1 ||
            inputDay > 31
        ) {
            setError("Invalid date. Please enter a valid date.");
            return;
        }

        const birthDate = new Date(inputYear, inputMonth - 1, inputDay);

        if (isNaN(birthDate.getTime())) {
            setError("Invalid date. Please enter a valid date.");
            return;
        }

        const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
        const weeksElapsed = Math.floor(
            (currentDate.getTime() - birthDate.getTime()) / millisecondsInWeek
        );

        setIsWeekElapsed(weeksElapsed);
        setError("");
    };

    useEffect(() => {
        // Add a brief animation when isWeekElapsed changes
        const gridCells = document.querySelectorAll(".grid-cell");

        gridCells.forEach((cell, index) => {
            if (index < isWeekElapsed) {
                cell.classList.add("pop-out");
                setTimeout(() => {
                    cell.classList.remove("pop-out");
                }, 600);
            }
        });
    }, [isWeekElapsed]);

    return (
        <div className="m-6 flex flex-col items-center ">
            <div className="flex justify-center items-center flex-wrap">
                <label className="mx-2 text-zinc-200">Day:</label>
                <input
                    type="text"
                    style={{ width: "3rem", color: "#484547"}}
                    value={birthdayDay}
                    onChange={(e) => {
                        setBirthdayDay(e.target.value);
                    }}
                    placeholder="DD"
                    className="border border-gray-400 p-2 rounded w-16 focus:outline-none focus:border-blue-500"
                />

                <label className="mx-2 text-zinc-200">Month:</label>
                <input
                    type="text"
                    style={{ width: "3rem", color: "#484547"}}
                    value={birthdayMonth}
                    onChange={(e) => setBirthdayMonth(e.target.value)}
                    placeholder="MM"
                    className="border border-gray-400 p-2 rounded w-16 focus:outline-none focus:border-blue-500"
                />

                <label className="mx-2 text-zinc-200">Year:</label>
                <input
                    type="text"
                    style={{color: "#484547"}}
                    value={birthdayYear}
                    onChange={(e) => setBirthdayYear(e.target.value)}
                    placeholder="YYYY"
                    className="border border-gray-400 p-2 rounded w-24 focus:outline-none focus:border-blue-500"
                />

                <button
                    onClick={handleSubmit}
                    className="ml-4 my-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                    Submit
                </button>
            </div>

            {error && (
                <h1 className="text-red-500 text-sm font-bold mb-4">{error}</h1>
            )}

            

            <div className="relative flex flex-col mt-2 ">
                
                <div className=" flex flex-row justify-end items-start my-2">
                    <div className="mr-1.5 font-semibold">Weeks</div>
                    <FaArrowRight className="mt-1"/>
                </div>

                <div className="absolute top-0 left-[-6rem] ">
                    {/* <h4>Years</h4> */}
                    <div className="ml-5 font-semibold">Years</div>
                    <FaArrowDown className="ml-7"/>
                </div>

                <div className="flex justify-between">
                    <div className="text-sm">0</div>
                    <div className="text-sm">52</div>
                </div>

                <div className="grid gap-y-[3px] gap-x-[2px] grid-cols-[repeat(26,minmax(0,1fr))] sm:grid-cols-[repeat(26,minmax(0,1fr))] md:grid-cols-[repeat(52,minmax(3.5px,1fr))] lg:grid-cols-[repeat(52,minmax(0px,10px))]">
                    {Array.from({ length: 52 * 90 }).map((_, index) => (
                        <div
                            key={index}
                            className={`grid-cell w-[8px] h-[8px] ${
                                index < isWeekElapsed
                                    ? "bg-[#1e7dad]"
                                    : "bg-white"
                            }`}
                        >
                            {index % 260 == 0 && (
                                <p className="m-0 relative right-7 bottom-1.5 text-sm">
                                    {(index / 260) * 5}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeeksToDie;
