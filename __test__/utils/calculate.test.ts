import { add } from "@/utils/calculate";

describe("add function", () => {
  it("should add two numbers", () => {
    const a = 2;
    const b = 3;

    expect(add(a, b)).toBe(5);
  });
});
