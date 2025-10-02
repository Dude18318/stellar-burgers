declare namespace Cypress {
  interface Chainable<Subject = any> {
    seedAuth(): Chainable<Subject>;
    visitAuthed(path?: string): Chainable<Subject>;
    assertConstructorEmpty(bunId: string, mainId: string): Chainable<void>;
    fillConstructor(bunId: string, mainId: string): Chainable<void>;
    assertConstructorFilled(bunId: string, mainId: string): Chainable<void>;
  }
}
