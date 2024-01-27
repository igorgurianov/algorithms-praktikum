import {
  btnSelector,
  inputSelector,
} from "../../src/constants/testing-selectors";

describe("FIBONACCI TEST", () => {
  beforeEach(() => {
    cy.visit("fibonacci");
    cy.get(btnSelector).as("button");
    cy.get(inputSelector).as("input");
  });

  it("button disabled", () => {
    cy.get("@button").should("be.disabled");
    cy.get("@input").type("6");
    cy.get("@button").should("not.be.disabled");
    cy.get("@input").clear();
    cy.get("@button").should("be.disabled");
  });

  it("numbers generated correctly", () => {
    cy.get("@input").type(3);
    cy.get("@button").click();

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
