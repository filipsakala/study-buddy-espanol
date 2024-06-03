import { render, screen } from "@testing-library/react";
import TranslateWordExercise from "./TranslateWordExercise";

jest.mock("../../../api/apiConfig", () => ({
  apiUrl: "http://localhost:3000",
}));

it("tests true", () => {
  render(<TranslateWordExercise />);

  const button = screen.getByRole("button");
  expect(button).toBeDefined();
  expect(true).toBe(true);
});
