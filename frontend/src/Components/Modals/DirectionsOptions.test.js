import { screen, render } from "@testing-library/react";
import DirectionsOptions from "./DirectionsOptions";
import { mount, shallow } from "enzyme";

test("Test if content appears", () => {
  const wrapper = shallow(<DirectionsOptions />);
  expect(wrapper.text().includes("Route Options")).toBe(true);
});

// test("Test if content appears", () => {
//     const wrapper = shallow(<DirectionsOptions />);
//     expect(wrapper.text().includes("Route Options")).toBe(true);
//   });
