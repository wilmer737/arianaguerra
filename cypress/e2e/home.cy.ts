describe("home test", () => {
  it("should allow you to go to the home page", () => {
    cy.visitAndCheck("/");
    cy.findByText("Home");
  });
});
