'use client'
import { useState } from "react"
import styles from "./results-filter.module.css"
import StarRatingFilter from "../star-rating-filter/star-rating-filter";

const uniqueFacilities = [
    'Restaurant', 'Bar', 'Free Parking', 'Safety Deposit Box', 'Laundry Service', 'Games Room', 'Internet Access', 'Free transport to theme parks', 'Swimming Pool', 'Room Service', 'Fitness Centre/Gym', 'Whirlpool', 'Spa', 'Evening Entertainment', 'No Smoking', 'Valet parking', 'Hot tub'
]


interface ResultsFilterProp {
    onStarRatingChange: (newRating: string) => void;
}


export default function ResultsFilter({ onStarRatingChange }: ResultsFilterProp) {

    const [filterBy, setFilterBy] = useState({ pricePerPerson: [0, 0], starRating: '', hotelFacilities: uniqueFacilities })
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isHotelFacilitiesOpen, setIsHotelFacilitiesOpen] = useState(true)

    const FacilitiesList = () => {
        return (
            <ul className={styles.facilitiesList}>
                {uniqueFacilities.map((facility, index) => (
                    <li key={`facility-${index}`}>{facility}</li>
                ))}
            </ul>
        )
    }


    const HandlerStarRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStarRating = e.target.value;
        const ratingValue = newStarRating === 'all' ? '' : newStarRating;
        setFilterBy({ ...filterBy, starRating: ratingValue });
        onStarRatingChange(ratingValue);
    };

    console.log("star rating", filterBy.starRating)



    const handleLowPriceRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPricePerPerson = Number(e.target.value)
        setFilterBy({ ...filterBy, pricePerPerson: [newPricePerPerson, filterBy.pricePerPerson[1]] })
    }

    const handleHighPriceRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPricePerPerson = Number(e.target.value)
        setFilterBy({ ...filterBy, pricePerPerson: [filterBy.pricePerPerson[0], newPricePerPerson] })
    }


    const RenderFilterPricePerPerson = () => {
        return (
            <ul>
                <li><input title="lowest" type="number" value={filterBy.pricePerPerson[0]} onChange={handleLowPriceRange} /></li>
                <li><input title="highest" type="number" value={filterBy.pricePerPerson[1]} onChange={handleHighPriceRange} /></li>
            </ul>
        )
    }

    const handleFilterOpen = () => {
        setIsFilterOpen(!isFilterOpen)
    }

    const handleHotelFacilitiesOpen = () => {
        setIsHotelFacilitiesOpen(!isHotelFacilitiesOpen)
    }

    return (
        <>
            <button onClick={handleFilterOpen} className={styles.filterButton}>{isFilterOpen ? 'Hide filters' : 'Filter results'}</button>
            <div className={styles.filterSearchResultsWrapper}>
                {isFilterOpen && (
                    <>
                        <div className={styles.filterByTitle}>filterBy:</div>
                        <div className={styles.filterWrapper}>
                            <StarRatingFilter filterBy={filterBy} onChangeHandleStarRating={HandlerStarRating} />
                        </div>

                        <div className={styles.filterWrapper}>

                            <div className={styles.pricePerPersonFilter}>Price per person</div> 
                                
                                {filterBy?.pricePerPerson ?
                                    ` Low:  £${filterBy.pricePerPerson[0]} | High: £${filterBy.pricePerPerson[1]}`
                                    : ''}
                                <RenderFilterPricePerPerson />
                                <div className={styles.filtersNotWorking}>- (filter not currently wired up to results)</div>
                            
                        </div>
                        <div className={styles.filterWrapper}>
                            <div>Hotel facilities: 
                                <button className={styles.facilitiesButton} onClick={handleHotelFacilitiesOpen}>{isHotelFacilitiesOpen ? 'Hide facilities' : 'Show facilities'}</button>
                                {isHotelFacilitiesOpen && (<FacilitiesList />)}
                                <div className={styles.filtersNotWorking}>- (filter not currently wired up to results)</div>
                            </div>
                        </div>


                    </>
                )}
            </div>
        </>
    )
}