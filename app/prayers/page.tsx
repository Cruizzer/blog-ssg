import React from "react";
import PrayersSelection from "../components/PrayersSelection";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Prayers = async () => {

  // Get the current date and pass it to getPrayerSelection. Additionally pass in the user's session
  // getPrayerSelection will fetch the data from universalis.com corresponding to the user's selection 

    // Query the database to see if the current user has a prayer selection which is within the range of startDate and endDate
    // If the user has a prayer selection, display a blank page, otherwise display the prayer selection

    // Get users session
    const session = await getServerSession(authOptions);

    return (
        <div>
            <PrayersSelection />
        </div>
    );
    
};

export default Prayers;