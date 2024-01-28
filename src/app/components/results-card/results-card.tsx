import { Holiday } from "@/types/booking";
import Image from "next/image";
import styles from './results-card.module.css'

interface ResultCardProps {
    holiday: Holiday
}



export default function ResultsCard({ holiday }: ResultCardProps) {
    const hotelImage = `https://${holiday.hotel.content.images[0].RESULTS_CAROUSEL.url}`;
    return (
        <>
            <Image src={hotelImage} alt={holiday.hotel.name} width={250} height={250} className={styles.hotelImage} />
            <h2>{holiday.hotel.content.name}</h2>
            <div className={styles.starRating}>Star rating: {holiday.hotel.content.starRating}</div>
            <div className={styles.price}>Total Price: £{holiday.totalPrice}</div>
            <ul>
                <li>Total Price: {holiday.totalPrice}</li>
                <li>Price Per Person: {holiday.pricePerPerson}</li>
                <li>departureDate: {holiday.departureDate}</li>
                <li>selectedDate: {holiday.selectedDate}</li>
                <li> Virgin Points: {holiday.virginPoints}</li>
                <li>Tier Points: {holiday.tierPoints}</li>
                <li> Hotel: {holiday.hotel.name}
                    <ul>
                        <li>Board Basis: {holiday.hotel.boardBasis}</li>
                        <li>Content: {holiday.hotel.content.name}</li>
                        <li>Hotel facilities:
                            <ul>
                                {
                                    holiday.hotel.content.hotelFacilities.map((facility) => (
                                        <li key={facility}>{facility}</li>
                                    ))}
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul >
        </>
    )
}