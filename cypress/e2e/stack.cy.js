describe("STACK functionality", () => {
  it("button disabled", () => {
    cy.visit("http://localhost:3000/stack");
    cy.get('[data-testid="input"]').should("have.value", "");
    cy.get('[data-testid="add-button"]').should("be.disabled");
  });

  it("add element", () => {
    cy.visit("http://localhost:3000/stack");
    cy.get('[data-testid="input"]').type("1");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid="circles-container"]')
      .first()
      .within(($el) => {
        cy.wrap($el)
          .get('[data-testid="circle-head"]')
          .should("have.text", "top");

        cy.wrap($el)
          .get('[data-testid="circle-letter"]')
          .should("have.text", "1");

        cy.wrap($el)
          .get('[data-testid="circle-tail"]')
          .should("have.text", "0");

        cy.wrap($el)
          .get('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      });

    cy.wait(500);

    cy.get('[data-testid="circles-container"]')
      .first()
      .within(($el) => {
        cy.wrap($el)
          .get('[data-testid="circle-head"]')
          .should("have.text", "top");

        cy.wrap($el)
          .get('[data-testid="circle-letter"]')
          .should("have.text", "1");

        cy.wrap($el)
          .get('[data-testid="circle-tail"]')
          .should("have.text", "0");

        cy.wrap($el)
          .get('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      });
  });

  it("delete element", () => {
    cy.clock();
    cy.visit("http://localhost:3000/stack");

    cy.get('[data-testid="input"]').type("1");
    cy.get('[data-testid="add-button"]').click();

    cy.tick(500);

    cy.get('[data-testid="remove-button"]').click();

    cy.get('[data-testid="circles-container"]')
      .last()
      .find('[data-testid="circle_styles"]')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");

    cy.tick(500);

    cy.get('[data-testid="circles-container"]').should("be.empty");
  });

  it("clear stack", () => {
    cy.visit("http://localhost:3000/stack");

    cy.get('[data-testid="input"]').type("1");
    cy.get('[data-testid="add-button"]').click();

    cy.wait(500);

    cy.get('[data-testid="input"]').type("2");
    cy.get('[data-testid="add-button"]').click();
    cy.wait(500);

    cy.get('[data-testid="input"]').type("3");
    cy.get('[data-testid="add-button"]').click();
    cy.wait(500);

    cy.get('[data-testid="clear-button"]').click();

    cy.get('[data-testid="circles-container"]').should("be.empty");
  });
});
