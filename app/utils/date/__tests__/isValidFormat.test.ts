import { isValidYYYYMM } from "../isValidFormat";

describe("isValidYYYYMM", () => {
  test("it returns false for invalid format", () => {
    expect(isValidYYYYMM("foo")).toBe(false);
  });

  test("it returns true for valid format", () => {
    expect(isValidYYYYMM("2020-01-01")).toBe(true);
  });
});
