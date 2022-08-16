import { screen, render } from "@testing-library/react";
import { mount, shallow } from "enzyme";
import Option from "./Option";
import { ReactComponent as WalkLogo } from "../../Assets/walklogo.svg";
import { ReactComponent as BusLogo } from "../../Assets/buslogo.svg";

test("Test for one bus", () => {
  const option_one_bus = {
    buses: [1],
    id: "1",
    instructions: ["Walk", "Bus", "Walk"],
    duration: "25",
  };

  render(<Option option={option_one_bus} />);
  screen.debug();
});

test("Test for 2 buses", () => {
  const option_two_bus = {
    buses: [1, 2],
    id: "2",
    instructions: ["Walk", "Bus", "Walk", "Bus", "Walk"],
    duration: "45",
  };

  render(<Option option={option_two_bus} />);
  screen.debug();
});

test("Test if 1 bus option info shows", () => {
  const option_one_bus = {
    buses: [1],
    id: "1",
    instructions: ["Walk", "Bus", "Walk"],
    duration: "25",
  };
  const wrapper = mount(<Option option={option_one_bus} />);
  expect(wrapper.text().includes("1")).toBe(true);
  expect(wrapper.text().includes("Walk")).toBe(true);
  expect(wrapper.text().includes("25")).toBe(true);
  expect(
    wrapper.containsMatchingElement(
      <WalkLogo className="h-8 flex-1 self-center " alt="Walking Logo" />
    )
  ).toEqual(true);
  expect(
    wrapper.containsMatchingElement(
      <BusLogo
        fill="#ffffff"
        className="h-12 flex-1 px-2 self-center"
        stroke="#ffffff"
        alt="Bus Logo"
      />
    )
  ).toEqual(true);
});

test("Test if 2 bus option info shows", () => {
  const option_two_bus = {
    buses: [1, 2],
    id: "2",
    instructions: ["Walk", "Bus", "Walk", "Bus", "Walk"],
    duration: "45",
  };
  const wrapper = mount(<Option option={option_two_bus} />);
  expect(wrapper.text().includes("1")).toBe(true);
  expect(wrapper.text().includes("2")).toBe(true);
  expect(wrapper.text().includes("Walk")).toBe(true);
  expect(wrapper.text().includes("Bus")).toBe(true);
  expect(wrapper.text().includes("45")).toBe(true);
  expect(
    wrapper.containsMatchingElement(
      <WalkLogo className="h-8 flex-1 self-center " alt="Walking Logo" />
    )
  ).toEqual(true);
  expect(
    wrapper.containsMatchingElement(
      <BusLogo
        fill="#ffffff"
        className="h-12 flex-1 px-2 self-center"
        stroke="#ffffff"
        alt="Bus Logo"
      />
    )
  ).toEqual(true);
});
