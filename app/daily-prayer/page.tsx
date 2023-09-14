import React from 'react'
import DailyGospel from "../components/DailyGospel"

const DailyPrayer = () => {
  return (
    <>
        {/* @ts-expect-error Server Component */}
        <DailyGospel />
    </>
  )
}

export default DailyPrayer