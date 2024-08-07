'use client';

import React from "react";
import Link from "next/link";

const TrackerDropdown = () => {
    return (
        <div className="relative group">
            <h1 className="text-2xl font-light text-white place-content-center mb-2 md:mb-0">
                <Link
                    href="#"
                    className="text-white/90 no-underline hover:text-white"
                >
                    Tracker
                </Link>
            </h1>

            <div className="absolute hidden group-hover:block bg-slate-700 p-2 space-y-2 rounded-md shadow-lg w-48 top-full left-1/2 transform -translate-x-1/2 md:left-0 md:transform-none">
                <Link
                    href="/death-tracker"
                    className="block px-4 py-2 text-white hover:text-gray-300 hover:bg-slate-600 rounded-md w-full text-left"
                >
                    Death Tracker
                </Link>
            </div>
        </div>
    );
}

export default TrackerDropdown;
