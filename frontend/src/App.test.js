import {
  render,
  screen,
  waitFor,
  getByText,
  findByRole,
  getByRole,
} from "@testing-library/react";
import App from "./App";

test("App loads with no errors", () => {
  render(<App />);
  screen.debug();
});

test("If page is loading", () => {
  render(<App />);
  expect(screen.getByRole("loading-message")).toHaveTextContent("Loading");
});

// set isloaded to true in app.js for the below tests
// test google map is visible to user
// test("should render the map to user", () => {
//   render(<App />);
//   const map = screen.getByRole("map");
//   expect(map).toBeVisible();
// });

// test("should render the navbar to user", () => {
//   render(<App />);
//   const navbar = screen.getByRole("navbar");
//   expect(navbar).toBeVisible();
// });
