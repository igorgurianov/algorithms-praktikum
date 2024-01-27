describe("QUEUE TEST", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
  });

  it("add button disabled", () => {
    cy.get('[data-testid="add-button"]').should("be.disabled");
    cy.get('[data-testid="input"]').type("6");
    cy.get('[data-testid="add-button"]').should("not.be.disabled");
    cy.get('[data-testid="input"]').clear();
    cy.get('[data-testid="add-button"]').should("be.disabled");
  });

  it("add element", () => {
    cy.get('[data-testid="input"]').type("1");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid*="circle-element"]').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "head");
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }
    });

    cy.wait(500);

    cy.get('[data-testid*="circle-element"]').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      }
    });

    cy.get('[data-testid="input"]').type("2");
    cy.get('[data-testid="add-button"]').click();

    cy.get('[data-testid*="circle-element"]').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "head");
      }
      if (index === 1) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }
    });
    cy.wait(500);

    cy.get('[data-testid*="circle-element"]').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "head");
      }
      if (index === 1) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      }
    });
  });

  it("remove element", () => {
    cy.get('[data-testid="input"]').type("1");
    cy.get('[data-testid="add-button"]').click();
    cy.wait(500);
    cy.get('[data-testid="input"]').type("2");
    cy.get('[data-testid="add-button"]').click();
    cy.wait(500);

    cy.get('[data-testid="delete-button"]').click();

    cy.get('[data-testid*="circle-element"]').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "head");
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }
      if (index === 1) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "tail");
      }
    });

    cy.wait(500);

    cy.get('[data-testid*="circle-element"]').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "");
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      }
      if (index === 1) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "head");
        cy.wrap($el).should("contain", "tail");
      }
    });
  });

  it("clear queue", () => {
    cy.get('[data-testid="input"]').type("1");
    cy.get('[data-testid="add-button"]').click();
    cy.wait(500);
    cy.get('[data-testid="input"]').type("2");
    cy.get('[data-testid="add-button"]').click();
    cy.wait(500);

    cy.get('[data-testid="clear-button"]').click();

    cy.get('[data-testid*="circle-element"]').each(($el) => {
      cy.wrap($el)
        .find('[data-testid="circle-letter"]')
        .should("have.text", "");
      cy.wrap($el)
        .find('[data-testid="circle_styles"]')
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
    });
  });
});
