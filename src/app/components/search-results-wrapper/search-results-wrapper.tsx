'use client'

import ResultsCard from "../results-card/results-card"
import ResultsFilter from "../results-filter/results-filter"
import { useState } from "react";
import styles from './search-results.wrapper.module.css'
import { BookingResponse } from "@/types/booking";

interface SearchResultsWrapperProps{
    results: BookingResponse
}

export default function SearchResultsWrapper({results}: SearchResultsWrapperProps){
    
    const [selectedStarRating, setSelectedStarRating] = useState('');
    
    const filteredHolidays = results.holidays.filter(holiday => 
        selectedStarRating === '' || holiday.hotel.content.starRating === selectedStarRating
    );

    

    const handleStarRatingChange = (newRating:string) => {
        setSelectedStarRating(newRating);
    };

    return (
        <>
           <section>
                <h2>{filteredHolidays.length} results found</h2>
                <ResultsFilter onStarRatingChange={handleStarRatingChange} />
                <div className={styles.ResultsCardWrapper}>
                    {filteredHolidays.map((holiday) => (
                        <div key={holiday.hotel.id} className={styles.resultsCard}>
                            <h2>Star rating: {holiday.hotel.content.starRating}</h2>
                            <ResultsCard holiday={holiday} />
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
};