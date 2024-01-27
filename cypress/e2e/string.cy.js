describe("string functionality", () => {
  it("button disabled if input is empty", () => {
    cy.visit("http://localhost:3000/recursion");
    cy.get('[data-testid="start algo"]').should("be.disabled");
    cy.get('[data-testid="input"]').type("check");
    cy.get('[data-testid="start algo"]').should("not.be.disabled");
    cy.get('[data-testid="input"]').clear();
    cy.get('[data-testid="start algo"]').should("be.disabled");
  });

  it("string reverse visualization", () => {
    cy.clock();
    const defaultBorder = "4px solid rgb(0, 50, 255)";
    const changingBorder = "4px solid rgb(210, 82, 225)";
    const modifiedBorder = "4px solid rgb(127, 224, 81)";

    cy.visit("http://localhost:3000/recursion");
    cy.get('[data-testid="input"]').type("qwe");
    cy.get('[data-testid="start algo"]').click();

    cy.get('[data-testid="circle-content"]').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains("q");
        cy.wrap($el)
          .children('[data-testid="circle_styles"]')
          .should("have.css", "border", changingBorder);
      }
      if (index === 1) {
        cy.wrap($el).contains("w");
        cy.wrap($el)
          .children('[data-testid="circle_styles"]')
          .should("have.css", "border", defaultBorder);
      }
      if (index === 2) {
        cy.wrap($el).contains("e");
        cy.wrap($el)
          .children('[data-testid="circle_styles"]')
          .should("have.css", "border", changingBorder);
      }
    });

    cy.tick(1000);

    cy.get('[data-testid="circle-content"]').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains("e");
        cy.wrap($el)
          .children('[data-testid="circle_styles"]')
          .should("have.css", "border", modifiedBorder);
      }
      if (index === 1) {
        cy.wrap($el).contains("w");
        cy.wrap($el)
          .children('[data-testid="circle_styles"]')
          .should("have.css", "border", modifiedBorder);
      }
      if (index === 2) {
        cy.wrap($el).contains("q");
        cy.wrap($el)
          .children('[data-testid="circle_styles"]')
          .should("have.css", "border", modifiedBorder);
      }
    });
  });
});
