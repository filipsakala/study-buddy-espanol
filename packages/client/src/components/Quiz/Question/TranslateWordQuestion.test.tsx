import { render, screen } from "@testing-library/react";
import TranslateWordQuestion from "./TranslateWordQuestion";

jest.mock("../../../api/apiConfig", () => ({
  apiUrl: "http://localhost:3000",
}));

it("tests true", () => {
  render(<TranslateWordQuestion />);

  const button = screen.getByRole("button");
  expect(button).toBeDefined();
  expect(true).toBe(true);
});
