import {
  circleStylesSelector,
  containerSelector,
  circleHeadSelector,
  circleLetterSelector,
  circleTailSelector,
  changingBorder,
  defaultBorder,
  inputSelector,
  addButton,
  clearButton,
} from "../../src/constants/testing-selectors";

describe("STACK functionality", () => {
  beforeEach(() => {
    cy.visit("stack");
    cy.get(containerSelector).as("container");
    cy.get(inputSelector).as("input");
    cy.get(addButton).as("add-button");
    //cy.get(circleHeadSelector).as("head");
  });

  it("button disabled", () => {
    cy.get("@input").should("have.value", "");
    cy.get("@add-button").should("be.disabled");
  });

  it("add element", () => {
    cy.get("@input").type("1");
    cy.get("@add-button").click();

    cy.get("@container")
      .first()
      .within(($el) => {
        cy.wrap($el).get(circleHeadSelector).should("have.text", "top");

        cy.wrap($el).get(circleLetterSelector).should("have.text", "1");

        cy.wrap($el).get(circleTailSelector).should("have.text", "0");

        cy.wrap($el)
          .get(circleStylesSelector)
          .should("have.css", "border", changingBorder);
      });

    cy.wait(500);

    cy.get("@container")
      .first()
      .within(($el) => {
        cy.wrap($el).get(circleHeadSelector).should("have.text", "top");

        cy.wrap($el).get(circleLetterSelector).should("have.text", "1");

        cy.wrap($el).get(circleTailSelector).should("have.text", "0");

        cy.wrap($el)
          .get(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
      });
  });

  it("delete element", () => {
    cy.clock();

    cy.get("@input").type("1");
    cy.get("@add-button").click();

    cy.tick(500);

    cy.get('[data-testid="remove-button"]').click();

    cy.get("@container")
      .last()
      .find(circleStylesSelector)
      .should("have.css", "border", changingBorder);

    cy.tick(500);

    cy.get("@container").should("be.empty");
  });

  it("clear stack", () => {
    cy.get("@input").type("1");
    cy.get("@add-button").click();

    cy.wait(500);

    cy.get("@input").type("2");
    cy.get("@add-button").click();
    cy.wait(500);

    cy.get("@input").type("3");
    cy.get("@add-button").click();
    cy.wait(500);

    cy.get(clearButton).click();

    cy.get("@container").should("be.empty");
  });
});
