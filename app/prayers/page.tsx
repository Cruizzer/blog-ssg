import React from "react";
import CustomizedAccordions from "../components/Accordion";

const Prayers = () => {
  const date = new Date().toLocaleDateString()

    return (
      <div className="flex h-max mt-10">
        <div className="m-auto w-2/5">
          <h1>Select prayers for {date}</h1>
          <CustomizedAccordions />
        </div>
      </div>
    );
};

export default Prayers;
