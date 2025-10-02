/// <reference types="cypress" />
/// <reference path="./commands.d.ts" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add('seedAuth', () => {
  cy.fixture('loginData.json').then((fx) => {
    const access = fx.accessToken.split('Bearer ')[1];
    const refresh = fx.refreshToken;

    cy.setCookie('accessToken', access);
    cy.setCookie('refreshToken', refresh);

    Cypress.env('LS_accessToken', access);
    Cypress.env('LS_refreshToken', refresh);
  });
});

Cypress.Commands.add('visitAuthed', (path: string = '/') => {
  cy.visit(path, {
    onBeforeLoad(win) {
      const at = Cypress.env('LS_accessToken');
      const rt = Cypress.env('LS_refreshToken');
      if (at) win.localStorage.setItem('accessToken', at);
      if (rt) win.localStorage.setItem('refreshToken', rt);
    }
  });
});

Cypress.Commands.add(
  'assertConstructorEmpty',
  (bunId: string, mainId: string) => {
    cy.get('[data-cy="burgerConstructorRoot"]')
      .should('exist')
      .within(() => {
        cy.get('[data-cy="upper-bun"]')
          .find(`[data-cy="ingredient-constructor:${bunId}"]`)
          .should('not.exist');

        cy.get('[data-cy="main"]')
          .find(`[data-cy="ingredient-constructor:${mainId}"]`)
          .should('not.exist');

        cy.get('[data-cy="lower-bun"]')
          .find(`[data-cy="ingredient-constructor:${bunId}"]`)
          .should('not.exist');
      });
  }
);

Cypress.Commands.add(
  'assertConstructorFilled',
  (bunId: string, mainId: string) => {
    cy.get('[data-cy="burgerConstructorRoot"]')
      .should('exist')
      .within(() => {
        cy.get('[data-cy="upper-bun"]')
          .find(`[data-cy="ingredient-constructor:${bunId}"]`)
          .should('exist');

        cy.get('[data-cy="main"]')
          .find(`[data-cy="ingredient-constructor:${mainId}"]`)
          .should('exist');

        cy.get('[data-cy="lower-bun"]')
          .find(`[data-cy="ingredient-constructor:${bunId}"]`)
          .should('exist');
      });
  }
);

Cypress.Commands.add('fillConstructor', (bunId: string, mainId: string) => {
  cy.get('[data-cy="ingredientsRoot"]')
    .should('exist')
    .within(() => {
      cy.get(`[data-cy="ingredient-list:${mainId}"]`).as('bunCard');
      cy.get(`[data-cy="ingredient-list:${bunId}"]`).as('mainCard');

      cy.get('@bunCard')
        .contains('button', 'Добавить')
        .scrollIntoView()
        .should('be.visible')
        .click();

      cy.get('@mainCard')
        .contains('button', 'Добавить')
        .scrollIntoView()
        .should('be.visible')
        .click();
    });
});
export {};
