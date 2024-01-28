import { mockBookingResponse } from "@/mocks/mockBookingResponse";
import { BookingResponse } from "@/types/booking";
import { Rooms } from "@/utils/composition.service";
import SearchResultsWrapper from "../search-results-wrapper/search-results-wrapper";
async function getData(params: { [key: string]: string | string[] | undefined }) {
    const body = {
        bookingType: params.bookingType,
        direct: false,
        location: params.location,
        departureDate: params.departureDate,
        duration: params.duration,
        gateway: params.gateway,
        partyCompositions: Rooms.parseAndConvert([params.partyCompositions as string]),
    };

    const res = await fetch(
        "https://www.virginholidays.co.uk/cjs-search-api/search",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export default async function SearchResultsComponent({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const req = await getData(searchParams);



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



// TODO change this back for production
    // const results: BookingResponse = req;
    const results: BookingResponse = updatedHolidays

    return (
        <SearchResultsWrapper results={results}/>
    )
}

// TODO write cypress test for star rating
// TODO write any documentation

// TODO Better style filters maybe horizonatal is good for now
// TODO Better style results cards

// TODO deploy to github under public account.
// TODO Email VA with results
