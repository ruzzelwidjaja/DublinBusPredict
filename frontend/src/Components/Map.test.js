import { render, screen } from "@testing-library/react";
import Map from "./Map";
import { mount, shallow } from "enzyme";

const stops = [
  {
    stop_id: "8220DB000002",
    stop_name: "Parnell Square West, stop 2",
    stop_lat: 53.3522443611407,
    stop_long: -6.26372321891882,
  },
];

// test("Map container loads", () => {
//   render(<Map stops={stops} />);
//   screen.debug();
// });
