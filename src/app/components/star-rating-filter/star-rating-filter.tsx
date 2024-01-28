
import styles from './star-rating-filter.module.css'

interface StarRatingFilterProps {
    filterBy: {
        pricePerPerson: number[],
        starRating: string,
        hotelFacilities: string[]
    }
    onChangeHandleStarRating: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
export default function StarRatingFilter({ filterBy, onChangeHandleStarRating }: StarRatingFilterProps) {

    const StarRatingDropDown = () => {
        const ratingChoice = ['all', '1', '2', '3', '4', '5']
        return (
            <select title="Rating" data-cy="star-rating-select" value={filterBy.starRating} onChange={onChangeHandleStarRating} >
                {ratingChoice.map((id) => <option key={id} value={id}>{id}</option>)}
            </select >
        )
    }


    return (
        <>
            <div className={styles.starRatingFilter}>Star rating:</div>
            <div className={styles.conditionalFilterText}>
                {filterBy?.starRating ?
                    (<><StarRatingDropDown /> out of 5</>)
                    : (<StarRatingDropDown />)}
            </div>

        </>
    )

}