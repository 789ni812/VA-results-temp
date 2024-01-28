'use client'


import { BookingResponse } from "@/types/booking";
import { Rooms } from "@/utils/composition.service";
import { mockBookingResponse } from "@/mocks/mockBookingResponse";

import { type NextRequest } from 'next/server'
import styles from './search-results.module.css'


import ResultsFilter from "../results-filter/results-filter";
import ResultsCard from "../result-card/result-card";



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
                    starRating: holiday.hotel.content.starRating || 'none'
                },
            }
        }
    })

    const updatedHolidays = { ...mockBookingResponse, holidays: usersMockResults, mixedArrivalAirports: false, }
    const results: BookingResponse = updatedHolidays;


    // const RenderSearchParams = () => {

    //     return (
    //         <div className={styles.searchParamsWrapper}>
    //             <h3>Search params:</h3>
    //             <ul>
    //                 <li className={styles.searchParamsList}>Booking type: {searchParams.bookingType}</li>
    //                 <li className={styles.searchParamsList}>location: {searchParams.location}</li>
    //                 <li className={styles.searchParamsList}>gateway: {searchParams.gateway}</li>
    //                 <li className={styles.searchParamsList}>departureDate: {searchParams.departureDate}</li>
    //                 <li className={styles.searchParamsList}>duration: {searchParams.duration}</li>
    //                 <li className={styles.searchParamsList}>party compositions: {searchParams.partyCompositions}</li>
    //             </ul>
    //         </div>
    //     )
    // }


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
