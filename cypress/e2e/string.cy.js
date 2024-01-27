import {
  defaultBorder,
  changingBorder,
  modifiedBorder,
  inputSelector,
  circleStylesSelector,
  circleContentSelector,
  startButton,
} from "../../src/constants/testing-selectors";

describe("string functionality", () => {
  beforeEach(() => {
    cy.visit("recursion");
    cy.get(inputSelector).as("input");
    cy.get(startButton).as("button");
  });

  it("button disabled if input is empty", () => {
    cy.get("@button").should("be.disabled");
    cy.get("@input").type("check");
    cy.get("@button").should("not.be.disabled");
    cy.get("@input").clear();
    cy.get("@button").should("be.disabled");
  });

  it("string reverse visualization", () => {
    cy.clock();

    cy.get("@input").type("qwe");
    cy.get("@button").click();

    cy.get(circleContentSelector).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains("q");
        cy.wrap($el)
          .children(circleStylesSelector)
          .should("have.css", "border", changingBorder);
      }
      if (index === 1) {
        cy.wrap($el).contains("w");
        cy.wrap($el)
          .children(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
      }
      if (index === 2) {
        cy.wrap($el).contains("e");
        cy.wrap($el)
          .children(circleStylesSelector)
          .should("have.css", "border", changingBorder);
      }
    });

    cy.tick(1000);

    cy.get(circleContentSelector).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains("e");
        cy.wrap($el)
          .children(circleStylesSelector)
          .should("have.css", "border", modifiedBorder);
      }
      if (index === 1) {
        cy.wrap($el).contains("w");
        cy.wrap($el)
          .children(circleStylesSelector)
          .should("have.css", "border", modifiedBorder);
      }
      if (index === 2) {
        cy.wrap($el).contains("q");
        cy.wrap($el)
          .children(circleStylesSelector)
          .should("have.css", "border", modifiedBorder);
      }
    });
  });
});
