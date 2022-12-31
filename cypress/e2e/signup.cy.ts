import { faker } from "@faker-js/faker";

describe("signup flow", () => {
  let originalCode = process.env.INVITE_CODE;
  process.env.INVITE_CODE = "test-invite-code";

  afterEach(() => {
    cy.cleanupUser();
  });

  after(() => {
    process.env.INVITE_SECRET = originalCode;
  });

  it("should not accept invalid code", () => {
    const credentials = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };

    cy.then(() => ({ email: credentials.email })).as("user");
    cy.visitAndCheck("/join");
    cy.findByLabelText("Email address").type(credentials.email);
    cy.findByLabelText("Password").type(credentials.password);
    cy.findByLabelText("Invite Code").type("invalid");
    cy.findByRole("button", { name: /Sign up/i }).click();

    cy.findByText(/Invalid invite code/i).should("exist");
  });

  it("should allow you to sign up", () => {
    const credentials = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };

    cy.then(() => ({ email: credentials.email })).as("user");
    cy.visitAndCheck("/join");

    cy.findByLabelText("Email address").type(credentials.email);
    cy.findByLabelText("Password").type(credentials.password);
    cy.findByLabelText("Invite Code").type("test-invite-code");
    cy.findByRole("button", { name: /Sign up/i }).click();

    cy.findByText(/New Child/i).should("exist");
  });
});
