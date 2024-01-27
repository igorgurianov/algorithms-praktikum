describe("app works correctly with routes", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  //fibonacci
  it("should open fibbonacci page", () => {
    cy.get('[data-testid="fibonacci-link"]').click();
    cy.url().should("include", "/fibonacci");
  });

  //list
  it("should open list page", () => {
    cy.get('[data-testid="list-link"]').click();
    cy.url().should("include", "/list");
  });

  //string
  it("should open string page", () => {
    cy.get('[data-testid="string-link"]').click();
    cy.url().should("include", "/recursion");
  });

  //queue
  it("should open queue page", () => {
    cy.get('[data-testid="queue-link"]').click();
    cy.url().should("include", "/queue");
  });

  //sorting
  it("should open sorting page", () => {
    cy.get('[data-testid="sorting-link"]').click();
    cy.url().should("include", "/sorting");
  });

  //stack
  it("should open stack page", () => {
    cy.get('[data-testid="stack-link"]').click();
    cy.url().should("include", "/stack");
  });
});
