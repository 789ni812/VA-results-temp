'use client'


import { BookingResponse } from "@/types/booking";
import { Rooms } from "@/utils/composition.service";
import { mockBookingResponse } from "@/mocks/mockBookingResponse";

import { type NextRequest } from 'next/server'
import styles from './search-results.module.css'


import ResultsFilter from "../results-filter/results-filter";
import ResultsCard from "../results-card/results-card";



export default function MockedResultsComponent({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }

}) {
    const usersMockResults = mockBookingResponse.holidays.map((holiday) => {
        return {
            ...holiday,
            flyingClubMiles: 0,
            hotel: {
                ...holiday.hotel,
                content: {
                    ...holiday.hotel.content,
                    vRating: holiday.hotel.content.vRating || 0,
                    starRating: holiday.hotel.content.starRating || null
                },
            }
        }
    })

    const updatedHolidays = { ...mockBookingResponse, holidays: usersMockResults, mixedArrivalAirports: false, }

    // const req = mockBookingResponse;
    // const results: BookingResponse = updatedHolidays;




    return (
        <div >
            <ResultsFilter />
            <div className={styles.ResultsCardWrapper}>

                {results.holidays.map((holiday) => (
                    <div key={holiday.hotel.id} className={styles.resultsCard}>
                        <ResultsCard holiday={holiday} />
                    </div>
                ))}
            </div >
        </div>
    )
}
