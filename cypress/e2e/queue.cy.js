import {
  defaultBorder,
  changingBorder,
  circleStylesSelector,
  addButton,
  inputSelector,
  circleElementSelector,
  circleLetterSelector,
  deleteButton,
  clearButton,
} from "../../src/constants/testing-selectors";

describe("QUEUE TEST", () => {
  beforeEach(() => {
    cy.visit("queue");
    cy.get(addButton).as("add-button");
    cy.get(inputSelector).as("input");
    cy.get(circleElementSelector).as("circle");
  });

  it("add button disabled", () => {
    cy.get("@add-button").should("be.disabled");
    cy.get("@input").type("6");
    cy.get("@add-button").should("not.be.disabled");
    cy.get("@input").clear();
    cy.get("@add-button").should("be.disabled");
  });

  it("add element", () => {
    cy.get("@input").type("1");
    cy.get("@add-button").click();

    cy.get("@circle").each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "head");
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", changingBorder);
      }
    });

    cy.wait(500);

    cy.get("@circle").each(($el, index) => {
      if (index === 0) {
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
      }
    });

    cy.get("@input").type("2");
    cy.get("@add-button").click();

    cy.get("@circle").each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "head");
      }
      if (index === 1) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", changingBorder);
      }
    });
    cy.wait(500);

    cy.get("@circle").each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "head");
      }
      if (index === 1) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
      }
    });
  });

  it("remove element", () => {
    cy.get("@input").type("1");
    cy.get("@add-button").click();
    cy.wait(500);
    cy.get("@input").type("2");
    cy.get("@add-button").click();
    cy.wait(500);

    cy.get(deleteButton).click();

    cy.get("@circle").each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "head");
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", changingBorder);
      }
      if (index === 1) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "tail");
      }
    });

    cy.wait(500);

    cy.get("@circle").each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).find(circleLetterSelector).should("contain", "");
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
      }
      if (index === 1) {
        cy.wrap($el).should("contain", "1");
        cy.wrap($el).should("contain", "head");
        cy.wrap($el).should("contain", "tail");
      }
    });
  });

  it("clear queue", () => {
    cy.get("@input").type("1");
    cy.get("@add-button").click();
    cy.wait(500);
    cy.get("@input").type("2");
    cy.get("@add-button").click();
    cy.wait(500);

    cy.get(clearButton).click();

    cy.get("@circle").each(($el) => {
      cy.wrap($el).find(circleLetterSelector).should("have.text", "");
      cy.wrap($el)
        .find(circleStylesSelector)
        .should("have.css", "border", defaultBorder);
    });
  });
});
