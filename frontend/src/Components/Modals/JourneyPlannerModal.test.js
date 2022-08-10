import { screen, render } from "@testing-library/react";
import JourneyPlannerModal from "./JourneyPlannerModal";
import { mount, shallow } from "enzyme";

test("Test if form content appears", () => {
  const wrapper = shallow(<JourneyPlannerModal />);
  expect(wrapper.text().includes("Start:")).toBe(true);
  expect(wrapper.text().includes("Stop:")).toBe(true);
});
