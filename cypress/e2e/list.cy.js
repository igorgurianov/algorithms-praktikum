import {
  addToHeadButtonSelector,
  addToTailButtonSelector,
  addByIndexButtonSelector,
  removeByIndexButtonSelector,
  removeFromHeadButtonSelector,
  removeFromTailButtonSelector,
  inputNumberSelector,
  inputIndexSelector,
  circleElementSelector,
  circleLetterSelector,
  circleStylesSelector,
  circleTailSelector,
  defaultBorder,
  changingBorder,
  modifiedBorder,
} from "../../src/constants/testing-selectors";

describe("LIST TEST", () => {
  beforeEach(() => {
    cy.visit("list");
    cy.get(addToHeadButtonSelector).as("add-to-head-button");
    cy.get(addToTailButtonSelector).as("add-to-tail-button");
    cy.get(addByIndexButtonSelector).as("add-by-index-button");
    cy.get(removeByIndexButtonSelector).as("remove-by-index-button");
    cy.get(removeFromHeadButtonSelector).as("remove-from-head-button");
    cy.get(removeFromTailButtonSelector).as("remove-from-tail-button");
    cy.get(inputNumberSelector).as("input-number");
    cy.get(inputIndexSelector).as("input-index");
    cy.get(circleElementSelector).as("circle");
  });

  it("buttons disabled", () => {
    cy.get("@add-to-head-button").should("be.disabled");
    cy.get("@add-to-tail-button").should("be.disabled");
    cy.get("@add-by-index-button").should("be.disabled");
    cy.get("@remove-by-index-button").should("be.disabled");
    cy.get("@remove-from-head-button").should("not.be.disabled");
    cy.get("@remove-from-tail-button").should("not.be.disabled");

    cy.get("@input-number").type("6");
    cy.get("@input-index").type("2");

    cy.get("@add-to-head-button").should("not.be.disabled");
    cy.get("@add-to-tail-button").should("not.be.disabled");
    cy.get("@add-by-index-button").should("not.be.disabled");
    cy.get("@remove-by-index-button").should("not.be.disabled");
  });

  it("default list render", () => {
    cy.get("@circle").each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).find(circleLetterSelector).should("contain", "0");

        cy.wrap($el).find(circleTailSelector).should("contain", "0");

        cy.wrap($el).should("contain", "head");
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
      }
      if (index === 1) {
        cy.wrap($el).find(circleLetterSelector).should("contain", "34");

        cy.wrap($el).find(circleTailSelector).should("contain", index);

        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
      }
      if (index === 2) {
        cy.wrap($el).find(circleLetterSelector).should("contain", "8");

        cy.wrap($el).find(circleTailSelector).should("contain", index);

        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
      }
      if (index === 3) {
        cy.wrap($el).find(circleLetterSelector).should("contain", "1");

        cy.wrap($el).find(circleTailSelector).should("contain", index);
        cy.wrap($el).should("contain", "tail");

        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
      }
    });
  });

  it("add to head", () => {
    cy.get("@input-number").type("6");
    cy.get("@add-to-head-button").click();

    cy.wait(500);
    cy.get("@circle")
      .first()
      .within(($el) => {
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", modifiedBorder);
        cy.wrap($el).should("contain", "head");
        cy.wrap($el).find(circleLetterSelector).should("contain", "6");
        cy.wrap($el).find(circleTailSelector).should("contain", "0");
      });
    cy.wait(500);

    cy.get("@circle")
      .first()
      .within(($el) => {
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
        cy.wrap($el).should("contain", "head");
        cy.wrap($el).find(circleLetterSelector).should("contain", "6");
        cy.wrap($el).find(circleTailSelector).should("contain", "0");
      });
  });

  it("remove from head", () => {
    cy.get("@remove-from-head-button").click();

    cy.get("@circle")
      .first()
      .within(($el) => {
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
        cy.wrap($el).find(circleLetterSelector).should("contain", "");
        cy.wrap($el).find(circleTailSelector).should("contain", "0");
      });
    cy.wait(500);

    cy.get("@circle")
      .first()
      .within(($el) => {
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
        cy.wrap($el).should("contain", "head");
        cy.wrap($el).find(circleLetterSelector).should("contain", "34");
        cy.wrap($el).find(circleTailSelector).should("contain", "0");
      });
  });

  it("add to tail", () => {
    cy.get("@input-number").type("6");
    cy.get("@add-to-tail-button").click();

    cy.wait(500);
    cy.get("@circle")
      .last()
      .within(($el) => {
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", modifiedBorder);
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el).find(circleLetterSelector).should("contain", "6");
        cy.wrap($el).find(circleTailSelector).should("contain", "4");
      });
    cy.wait(500);

    cy.get("@circle")
      .last()
      .within(($el) => {
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el).find(circleLetterSelector).should("contain", "6");
        cy.wrap($el).find(circleTailSelector).should("contain", "4");
      });
  });

  it("remove from tail", () => {
    cy.get("@remove-from-tail-button").click();

    cy.get("@circle")
      .last()
      .within(($el) => {
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);

        cy.wrap($el).find(circleLetterSelector).should("contain", "");
        cy.wrap($el).find(circleTailSelector).should("contain", "3");
      });
    cy.wait(500);

    cy.get("@circle")
      .last()
      .within(($el) => {
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el).find(circleLetterSelector).should("contain", "8");
        cy.wrap($el).find(circleTailSelector).should("contain", "2");
      });
  });

  it("add by index", () => {
    cy.get("@input-number").type("2");
    cy.get("@input-index").type("2");
    cy.get("@add-by-index-button").click();

    cy.get("@circle").each(($el, index) => {
      if (index === 0) {
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
          .should("have.css", "border", changingBorder);
      }

      if (index === 1) {
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
          .should("have.css", "border", changingBorder);
      }

      if (index === 1) {
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", changingBorder);
      }

      if (index === 2) {
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", modifiedBorder);
        cy.wrap($el).find(circleLetterSelector).should("contain", "2");
      }
    });
    cy.wait(500);

    cy.get("@circle").each(($el) => {
      cy.wrap($el)
        .find(circleStylesSelector)
        .should("have.css", "border", defaultBorder);
    });
  });

  it("remove by index", () => {
    cy.get("@input-index").type("2");
    cy.get("@remove-by-index-button").click();

    cy.get("@circle").each(($el, index) => {
      if (index === 0) {
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
          .should("have.css", "border", changingBorder);
      }

      if (index === 1) {
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
          .should("have.css", "border", changingBorder);
      }

      if (index === 1) {
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", changingBorder);
      }

      if (index === 2) {
        cy.wrap($el)
          .find(circleStylesSelector)
          .should("have.css", "border", defaultBorder);
        cy.wrap($el).find(circleLetterSelector).should("contain", "1");
      }
    });
    cy.wait(500);

    cy.get("@circle").each(($el) => {
      cy.wrap($el)
        .find(circleStylesSelector)
        .should("have.css", "border", defaultBorder);
    });
  });
});
