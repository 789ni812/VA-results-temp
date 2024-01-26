



import { BookingResponse } from "@/types/booking";
import { Rooms } from "@/utils/composition.service";
// import { mockBookingResponse } from "@/mocks/mockBookingResponse";
import { mockBookingResponseSML as mockBookingResponse } from "@/mocks/mockBookingResponse";
import { type NextRequest } from 'next/server'
import styles from './search-results.module.css'
export default function MockedResultsComponent({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {






    const req = mockBookingResponse;
    const results: BookingResponse = req;


    const RenderSearchParams = () => {
        return (
            <div className={styles.searchParamsWrapper}>
                <h3>Search params:</h3>
                <ul>
                    <li className={styles.searchParamsList}>Booking type: {searchParams.bookingType}</li>
                    <li className={styles.searchParamsList}>location: {searchParams.location}</li>
                    <li className={styles.searchParamsList}>gateway: {searchParams.gateway}</li>
                    <li className={styles.searchParamsList}>departureDate: {searchParams.departureDate}</li>
                    <li className={styles.searchParamsList}>duration: {searchParams.duration}</li>
                    <li className={styles.searchParamsList}>party compositions: {searchParams.partyCompositions}</li>
                </ul>
            </div>
        )
    }

    return (
        <div>
            <RenderSearchParams />
            <div className={styles.ResultsCardWrapper}>
                {results.holidays.map((offer) => (
                    <div key={offer.hotel.id} className={styles.resultsCard}>
                        <ul>
                            <li>totalPrice: {offer.totalPrice}</li>
                            <li>pricePerPerson: {offer.pricePerPerson}</li>
                            <li>departureDate: {offer.departureDate}</li>
                            <li>selectedDate: {offer.selectedDate}</li>
                            <li> {offer.virginPoints}</li>
                            <li> {offer.tierPoints}</li>
                            <li> Hotel: {offer.hotel.name}
                                <ul>
                                    <li>Borad Basis: {offer.hotel.boardBasis}</li>
                                    <li>Content: {offer.hotel.content.name}</li>
                                    <li>****** MORE CONTENT TO ADD *******</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                ))}
            </div >
        </div>
    )
}
