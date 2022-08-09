import { screen, render } from "@testing-library/react";
import { mount, shallow } from "enzyme";
import ChooseRouteModal from "./ChooseRouteModal";
import Option from "./Option";
import ReactLoading from "react-loading";

test("Test if option renders", () => {
  const routeOptions = [
    {
      remove: "NO",
    },
  ];
  const wrapper = shallow(
    <ChooseRouteModal resultsReady={true} routeOptions={routeOptions} />
  );
  expect(wrapper.containsMatchingElement(<Option />)).toEqual(true);
});

test("Test if loading ", () => {
  const routeOptions = [
    {
      remove: "NO",
    },
  ];
  const wrapper = mount(
    <ChooseRouteModal resultsReady={false} routeOptions={routeOptions} />
  );
  expect(
    wrapper.containsMatchingElement(
      <ReactLoading type={"bubbles"} color="#475569" />
    )
  ).toEqual(true);
});
