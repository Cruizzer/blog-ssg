import React from "react";
import DailyGospel from "../components/DailyGospel";
export const dynamic = "force-dynamic";

const DailyPrayer = () => {
    return (
        <>
            {/* @ts-expect-error Server Component */}
            <DailyGospel />
        </>
    );
};

export default DailyPrayer;
