describe('ingredients mocked', () => {
  it('uses fixture for /api/ingredients', () => {
    cy.visit('/');

    // дожидаемся перехвата
    cy.wait('@getIngredients').its('response.statusCode').should('eq', 200);

    //  сверем body ответа с фикстурой
    cy.fixture('ingredients.json').then((fixture) => {
      cy.get('@getIngredients')
        .its('response.body')
        .should('deep.equal', fixture);
    });
  });
});
