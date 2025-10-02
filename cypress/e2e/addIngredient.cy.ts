import { TIngredientsResponse } from '../../src/utils/types';
import type { TIngredient } from '../../src/utils/types';

describe('Добавление ингредиента', () => {
  it('добавляет булку,ингредиент и проверяет добавилось ли в конструктор', () => {
    cy.visit('/');
    cy.wait('@getIngredients').its('response.statusCode').should('eq', 200);

    cy.fixture<TIngredientsResponse>('ingredients.json').then(({ data }) => {
      const bun: TIngredient | undefined = data.find((x) => x.type === 'bun')!;
      const main: TIngredient | undefined = data.find(
        (x) => x.type === 'main'
      )!;

      cy.assertConstructorEmpty(bun._id, main._id);

      cy.fillConstructor(bun._id, main._id);

      cy.assertConstructorFilled(bun._id, main._id);
    });
  });
});
