import { Holiday } from "@/types/booking";

interface ResultCardProps {
    holiday: Holiday
}

export default function  ResultsCard ({ holiday }: ResultCardProps) {
    return (
        <ul>
            <li>Total Price: {holiday.totalPrice}</li>
            <li>Price Per Person: {holiday.pricePerPerson}</li>
            <li>departureDate: {holiday.departureDate}</li>
            <li>selectedDate: {holiday.selectedDate}</li>
            <li> Virgin Points: {holiday.virginPoints}</li>
            <li>Tier Points: {holiday.tierPoints}</li>
            <li> Hotel: {holiday.hotel.name}
                <ul>
                    <li>Borad Basis: {holiday.hotel.boardBasis}</li>
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
    )
}