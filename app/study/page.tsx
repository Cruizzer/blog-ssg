import React from "react";
import StudyPrayer from "../components/StudyPrayer";

const Study = () => {
    {
        /* @ts-expect-error Server Component */
        return <StudyPrayer />;
    }
};

export default Study;
