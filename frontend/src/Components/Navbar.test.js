import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

test("Navbar loads with no errors", () => {
  render(<Navbar />);
  screen.debug();
});

test("If buttons are present", () => {
  render(<Navbar />);

  expect(screen.getAllByRole("button", { name: /Journey Planner/i }));
  expect(screen.getAllByRole("button", { name: /Route Information/i }));
  expect(screen.getAllByRole("button", { name: /Sign In/i }));
});
