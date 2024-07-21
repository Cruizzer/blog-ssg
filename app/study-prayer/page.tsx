import React from "react";
import Study from "../components/StudyPrayer";

const StudyPrayer = () => {
    {
        /* @ts-expect-error Server Component */
        return <Study />;
    }
};

export default StudyPrayer;
