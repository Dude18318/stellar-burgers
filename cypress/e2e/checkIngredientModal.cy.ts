import { TIngredientsResponse } from '../../src/utils/types';
import type { TIngredient } from '../../src/utils/types';

describe('Открытие модалки с ингредиентом', () => {
  it('Ищем ингредиент в списке и кликаем на него, затем закрываем нажатием на кнопку/оверлей', () => {
    cy.visit('/');
    cy.wait('@getIngredients').its('response.statusCode').should('eq', 200);

    cy.fixture<TIngredientsResponse>('ingredients.json').then(({ data }) => {
      const main: TIngredient | undefined = data.find(
        (x) => x.type === 'main'
      )!;

      cy.get(`[data-cy="ingredient-list:${main._id}"]`).as('mainCard');

      cy.get('@mainCard')
        .find(`a[href="/ingredients/${main._id}"]`)
        .scrollIntoView()
        .should('be.visible')
        .click();

      let modal = cy.get('[data-cy="modal"]').should('be.visible');
      cy.url().should('include', '/ingredients/');

      modal.find('[data-cy="close-modal"').should('exist').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('@mainCard')
        .find(`a[href="/ingredients/${main._id}"]`)
        .scrollIntoView()
        .should('be.visible')
        .click();

      modal = cy.get('[data-cy="modal"]').should('be.visible');
      cy.url().should('include', '/ingredients/');
      cy.get('[data-cy="modal-overlay"]').click('topLeft', { force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
      cy.url().should('not.include', '/ingredients/');
    });
  });
});
