import { screen, render } from "@testing-library/react";
import { mount, shallow } from "enzyme";
import BusRoute from "./BusRoute";

test("Route loads with no errors", () => {
  const routeInfo = {
    route_short_name: "test",
    shape_id: "1",
    trip_headsign: "145",
  };

  render(<BusRoute routeInfo={routeInfo} />);
  screen.debug();
});

test("Test if bus route info shows", () => {
  const routeInfo = {
    route_short_name: "test",
    shape_id: "1",
    trip_headsign: "145",
  };
  const wrapper = mount(<BusRoute routeInfo={routeInfo} />);
  expect(wrapper.text().includes("test")).toBe(true);
  expect(wrapper.text().includes("145")).toBe(true);
});
