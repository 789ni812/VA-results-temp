import StarRatingFilter from "@/app/components/star-rating-filter/star-rating-filter";

describe('StarRatingFilter Component', () => {
    let initialProps: { filterBy: { starRating: string, pricePerPerson: number[], hotelFacilities: string[] }; onChangeHandleStarRating: () => void };

    beforeEach(() => {
        initialProps = {
            filterBy: { starRating: 'all', pricePerPerson: [], hotelFacilities: [] },
            onChangeHandleStarRating: cy.stub().as('onChangeHandleStarRating')
        };

        cy.mount(<StarRatingFilter {...initialProps} />);
    });


    it('contains correct star rating options', () => {
        const options = ['all', '1', '2', '3', '4', '5'];
        options.forEach((option, index) => {
            cy.get('[data-cy=star-rating-select]').find('option').eq(index).should('have.text', option);
        });
    });
    
    it('allows changing the star rating', () => {
        cy.get('[data-cy=star-rating-select]').select('3').then(() => {
            initialProps.filterBy.starRating = '3';
            cy.mount(<StarRatingFilter {...initialProps} />);
            cy.get('[data-cy=star-rating-select]').should('have.value', '3');
        });
    });

    it('Contains correct wording "out of 5"', () => {
        cy.contains(/out of 5/i).should('be.visible');
    
    });
});
