// Add <CustomizedAccordions /> to the Prayers component

import React from "react";
import CustomizedAccordions from "./Accordion";

const PrayersSelection = () => {
  const date = new Date().toLocaleDateString()

    return (
      <div className="flex items-center mt-10">
        <div className="m-auto max-w-max">
          <h1>Select prayers for {date}</h1>
          <CustomizedAccordions />
        </div>
      </div>
    );
};

export default PrayersSelection;