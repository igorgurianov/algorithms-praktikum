describe("FIBONACCI TEST", () => {
  it("button disabled", () => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.get('[data-testid="button"]').should("be.disabled");
    cy.get('[data-testid="input"]').type("6");
    cy.get('[data-testid="button"]').should("not.be.disabled");
    cy.get('[data-testid="input"]').clear();
    cy.get('[data-testid="button"]').should("be.disabled");
  });

  it("numbers generated correctly", () => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.get('[data-testid="input"]').type(3);
    cy.get('[data-testid="button"]').click();

    cy.get('[data-testid="circles-container"] li').should("have.length", 4);

    cy.get('[data-testid*="circle-item"]').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).should("contain", "1");
      }
      if (index === 1) {
        cy.wrap($el).should("contain", "1");
      }
      if (index === 2) {
        cy.wrap($el).should("contain", "2");
      }
      if (index === 3) {
        cy.wrap($el).should("contain", "3");
      }
    });
  });
});
