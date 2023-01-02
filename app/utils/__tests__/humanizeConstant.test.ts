import humanizeConstant from "../humanizeConstant";

describe("humanizeConstant", () => {
  it("should return a humanized string", () => {
    expect(humanizeConstant("FOO_BAR")).toBe("Foo Bar");
  });
});
