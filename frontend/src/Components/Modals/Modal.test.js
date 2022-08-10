import { screen, render } from "@testing-library/react";
import Modal from "./Modal";
import JourneyPlannerModal from "./JourneyPlannerModal";
import { mount, shallow } from "enzyme";
import ChooseRouteModal from "./ChooseRouteModal";
import RoutesModal from "./RoutesModal";

test("Test if journey planner renders", () => {
  const wrapper = shallow(<Modal modalType={"journeyPlanner"} />);
  expect(wrapper.containsMatchingElement(<JourneyPlannerModal />)).toEqual(
    true
  );
});

test("Test if choose routes renders", () => {
  let directionsOutput = "Directions output exists";
  const wrapper = shallow(
    <Modal modalType={"chooseRoutes"} directionsOutput={directionsOutput} />
  );
  expect(wrapper.containsMatchingElement(<ChooseRouteModal />)).toEqual(true);
});

test("Test if no routes renders", () => {
  const wrapper = mount(
    <Modal modalType={"chooseRoutes"} directionsOutput={null} />
  );
  expect(
    wrapper.text().includes("Sorry, no routes were found for your journey.")
  ).toBe(true);
});

test("Test if routes modal renders", () => {
  const wrapper = shallow(<Modal modalType={"routes"} />);
  expect(wrapper.containsMatchingElement(<RoutesModal />)).toEqual(true);
});
