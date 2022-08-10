import { screen, render } from "@testing-library/react";
import RoutesModal from "./RoutesModal";
import { mount, shallow } from "enzyme";
import BusRoute from "./BusRoute";

test("Test if no info renders", () => {
  const wrapper = mount(<RoutesModal nameHeadsign={[]} />);
  expect(
    wrapper.text().includes("Sorry, no route information could be found.")
  ).toBe(true);
});

test("Test if bus route modal renders", () => {
  const wrapper = shallow(<RoutesModal nameHeadsign={[1, 2, 3]} />);
  expect(wrapper.containsMatchingElement(<BusRoute />)).toEqual(true);
});
