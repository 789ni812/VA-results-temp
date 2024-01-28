'use client'
import { useState } from "react"
import styles from "./results-filter.module.css"

const uniqueFacilities = [
    'Restaurant', 'Bar', 'Free Parking', 'Safety Deposit Box', 'Laundry Service', 'Games Room', 'Internet Access', 'Free transport to theme parks', 'Swimming Pool', 'Room Service', 'Fitness Centre/Gym', 'Whirlpool', 'Spa', 'Evening Entertainment', 'No Smoking', 'Valet parking', 'Hot tub'
]


export default function  ResultsFilter()
{

    const [filterBy, setFilterBy] = useState({ pricePerPerson: [0, 0], starRating: '', hotelFacilities: uniqueFacilities })
    

    const FacilitiesList = () => {
        return (
                <ul>
                    {uniqueFacilities.map((facility, index) => (
                        <li key={`facility-${index}`}>{facility}</li>
                    ))}
                </ul>
        )
    }
    
    const HandlerStarRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStarRating = e.target.value;
        setFilterBy({ ...filterBy, starRating: newStarRating })
    }
    
    const FilterStartRating = () => {
        const ratingChoice = ['none', '1', '2', '3', '4', '5']
        return (
            <select title="Rating" value={filterBy.starRating} onChange={HandlerStarRating} >
                {ratingChoice.map((id) => <option key={id} value={id}>{id}</option>)}
            </select >
        )
    }
    
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
    
    return (
        <div className={styles.filterSearchResultsWrapper}>
            <ul>
                <li>filterBy:
                    <ul>
                        <li>Price per person
                            {filterBy?.pricePerPerson ?
                                ` Low:  £${filterBy.pricePerPerson[0]} | High: £${filterBy.pricePerPerson[1]}`
                                : ''}
                            <span className={styles.changeFilter}>Change:</span> <RenderFilterPricePerPerson />
                        </li>

                        <li>Star rating
                            {filterBy?.starRating ?
                                ` ${filterBy.starRating} out of 5`
                                : ''}
                            <span className={styles.changeFilter}>Change:</span> <FilterStartRating />
                        </li>
                        <li>Hotel facilities:
                            <FacilitiesList />
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}