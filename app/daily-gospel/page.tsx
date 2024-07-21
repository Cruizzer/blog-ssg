import React from "react";
import Gospel from "../components/DailyGospel";
export const dynamic = "force-dynamic";

const DailyGospel = () => {
    return (
        <>
            {/* @ts-expect-error Server Component */}
            <Gospel />
        </>
    );
};

export default DailyGospel;
