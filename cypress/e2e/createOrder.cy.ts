import { TIngredientsResponse } from '../../src/utils/types';
import { TNewOrderResponse } from '../../src/utils/types';
import type { TIngredient } from '../../src/utils/types';

describe('Создание заказа', () => {
  it('добавляет булку, ингредиент и проверяет добавилось ли в конструктор', () => {
    cy.session('user-seeded', () => {
      cy.seedAuth();
      cy.visitAuthed('/');
    });

    cy.visitAuthed('/');
    cy.wait('@getIngredients').its('response.statusCode').should('eq', 200);

    cy.fixture<TIngredientsResponse>('ingredients.json').then(({ data }) => {
      const bun: TIngredient = data.find(
        (x) => x._id === '643d69a5c3f7b9001cfa093d'
      )!;
      const main: TIngredient = data.find(
        (x) => x._id === '643d69a5c3f7b9001cfa093e'
      )!;

      cy.fillConstructor(bun._id, main._id);
      cy.assertConstructorFilled(bun._id, main._id);

      cy.get('[data-cy="confirmButton"]')
        .scrollIntoView()
        .find('button')
        .click();

      // Смотрим в модалку, т.к. в ней появляется спиннер и затем заказ
      cy.get('[data-cy="modal"]').within(() => {
        // Ждём появления спиннера
        // cy.get('[data-cy="preloader"]', { timeout: 8000 }).should('exist');
        // Ждём исчезновения спиннера
        cy.get('[data-cy="preloader"]', { timeout: 15000 }).should('not.exist');

        // Ждём пока не появится сам заказ
        const order = cy
          .get('[data-cy="orderNumber"]', { timeout: 15000 })
          .should('be.visible');

        cy.fixture<TNewOrderResponse>('orderRespons.json').then((data) => {
          order.contains(data.order.number);
        });
      });
      cy.get('[data-cy="modal-overlay"]').click('topLeft', { force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
      cy.assertConstructorEmpty(bun._id, main._id);
    });
  });
});
