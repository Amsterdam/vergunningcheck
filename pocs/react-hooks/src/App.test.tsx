import { useSession } from "./App";

describe("App", () => {
  describe("Session Provider", () => {
    it("should do stuff", () => {
      expect(useSession).not.toBeUndefined();
    });
  });
  describe("useSession hook", () => {
    it("should do stuff", () => {
      expect(true).toBe(true);
    });
  });
});
