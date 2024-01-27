describe("QUEUE TEST", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("buttons disabled", () => {
    cy.get('[data-testid="add-to-head"]').should("be.disabled");
    cy.get('[data-testid="add-to-tail"]').should("be.disabled");
    cy.get('[data-testid="add-by-index"]').should("be.disabled");
    cy.get('[data-testid="remove-by-index"]').should("be.disabled");
    cy.get('[data-testid="remove-from-head"]').should("not.be.disabled");
    cy.get('[data-testid="remove-from-tail"]').should("not.be.disabled");

    cy.get('[data-testid="input-number"]').type("6");
    cy.get('[data-testid="input-index"]').type("2");

    cy.get('[data-testid="add-to-head"]').should("not.be.disabled");
    cy.get('[data-testid="add-to-tail"]').should("not.be.disabled");
    cy.get('[data-testid="add-by-index"]').should("not.be.disabled");
    cy.get('[data-testid="remove-by-index"]').should("not.be.disabled");
  });

  it("default list render", () => {
    cy.get('[data-testid*="circle-element"]').each(($el, index) => {
      if (index === 0) {
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "0");

        cy.wrap($el).find('[data-testid="circle-tail"]').should("contain", "0");

        cy.wrap($el).should("contain", "head");
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      }
      if (index === 1) {
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "34");

        cy.wrap($el)
          .find('[data-testid="circle-tail"]')
          .should("contain", index);

        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      }
      if (index === 2) {
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "8");

        cy.wrap($el)
          .find('[data-testid="circle-tail"]')
          .should("contain", index);

        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      }
      if (index === 3) {
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "1");

        cy.wrap($el)
          .find('[data-testid="circle-tail"]')
          .should("contain", index);
        cy.wrap($el).should("contain", "tail");

        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
      }
    });
  });

  it("add to head", () => {
    cy.get('[data-testid="input-number"]').type("6");
    cy.get('[data-testid="add-to-head"]').click();

    cy.wait(500);
    cy.get('[data-testid="circle-element"]')
      .first()
      .within(($el) => {
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        cy.wrap($el).should("contain", "head");
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "6");
        cy.wrap($el).find('[data-testid="circle-tail"]').should("contain", "0");
      });
    cy.wait(500);

    cy.get('[data-testid="circle-element"]')
      .first()
      .within(($el) => {
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        cy.wrap($el).should("contain", "head");
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "6");
        cy.wrap($el).find('[data-testid="circle-tail"]').should("contain", "0");
      });
  });

  it("remove from head", () => {
    cy.get('[data-testid="remove-from-head"]').click();

    cy.get('[data-testid="circle-element"]')
      .first()
      .within(($el) => {
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "");
        cy.wrap($el).find('[data-testid="circle-tail"]').should("contain", "0");
      });
    cy.wait(500);

    cy.get('[data-testid="circle-element"]')
      .first()
      .within(($el) => {
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        cy.wrap($el).should("contain", "head");
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "34");
        cy.wrap($el).find('[data-testid="circle-tail"]').should("contain", "0");
      });
  });

  it("add to tail", () => {
    cy.get('[data-testid="input-number"]').type("6");
    cy.get('[data-testid="add-to-tail"]').click();

    cy.wait(500);
    cy.get('[data-testid="circle-element"]')
      .last()
      .within(($el) => {
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "6");
        cy.wrap($el).find('[data-testid="circle-tail"]').should("contain", "4");
      });
    cy.wait(500);

    cy.get('[data-testid="circle-element"]')
      .last()
      .within(($el) => {
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "6");
        cy.wrap($el).find('[data-testid="circle-tail"]').should("contain", "4");
      });
  });

  it("remove from tail", () => {
    cy.get('[data-testid="remove-from-tail"]').click();

    cy.get('[data-testid="circle-element"]')
      .last()
      .within(($el) => {
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");

        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "");
        cy.wrap($el).find('[data-testid="circle-tail"]').should("contain", "3");
      });
    cy.wait(500);

    cy.get('[data-testid="circle-element"]')
      .last()
      .within(($el) => {
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "8");
        cy.wrap($el).find('[data-testid="circle-tail"]').should("contain", "2");
      });
  });

  it("add by index", () => {
    cy.get('[data-testid="input-number"]').type("2");
    cy.get('[data-testid="input-index"]').type("2");
    cy.get('[data-testid="add-by-index"]').click();

    cy.get('[data-testid*="circle-element"]').each(($el, index) => {
      if (index === 0) {
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
          .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }

      if (index === 1) {
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
          .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }

      if (index === 1) {
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }

      if (index === 2) {
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(127, 224, 81)");
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "2");
      }
    });
    cy.wait(500);

    cy.get('[data-testid*="circle-element"]').each(($el) => {
      cy.wrap($el)
        .find('[data-testid="circle_styles"]')
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
    });
  });

  it("remove by index", () => {
    cy.get('[data-testid="input-index"]').type("2");
    cy.get('[data-testid="remove-by-index"]').click();

    cy.get('[data-testid*="circle-element"]').each(($el, index) => {
      if (index === 0) {
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
          .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }

      if (index === 1) {
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
          .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }

      if (index === 1) {
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }

      if (index === 2) {
        cy.wrap($el)
          .find('[data-testid="circle_styles"]')
          .should("have.css", "border", "4px solid rgb(0, 50, 255)");
        cy.wrap($el)
          .find('[data-testid="circle-letter"]')
          .should("contain", "1");
      }
    });
    cy.wait(500);

    cy.get('[data-testid*="circle-element"]').each(($el) => {
      cy.wrap($el)
        .find('[data-testid="circle_styles"]')
        .should("have.css", "border", "4px solid rgb(0, 50, 255)");
    });
  });
});
