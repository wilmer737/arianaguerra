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

  it("should allow you to sign up and add child", () => {
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

    cy.findByText(/Add Your Child/i).should("exist");

    const baby = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };
    cy.findByLabelText("First Name").type(baby.firstName);
    cy.findByLabelText("Last Name").type(baby.lastName);
    cy.findByLabelText("Birth Date").type("2021-01-01");
    cy.findByRole("button", { name: /Add/i }).click();

    cy.findByText(/Add Your Child/i).should("not.exist");
    cy.findByText(`${baby.firstName} ${baby.lastName}`).should("exist");
  });
});
