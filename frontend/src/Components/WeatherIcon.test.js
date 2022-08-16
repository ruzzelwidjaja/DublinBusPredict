import { render, screen } from "@testing-library/react";
import WeatherIcon from "./WeatherIcon";

// // declare which API requests to mock
// const server = setupServer(
//   // capture "GET /greeting" requests
//   rest.get(
//     "https://api.openweathermap.org/data/2.5/weather?q=Dublin&appid=3d2cae43935ab6fcf8436e45feb7510e",
//     (req, res, ctx) => {
//       // respond using a mocked JSON body
//       return res(
//     ctx.json({
//       coord: { lon: -121.9358, lat: 37.7021 },
//       weather: [
//         { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
//       ],
//       base: "stations",
//       main: {
//         temp: 298.54,
//         feels_like: 298.47,
//         temp_min: 291.49,
//         temp_max: 304.21,
//         pressure: 1012,
//         humidity: 51,
//       },
//       visibility: 10000,
//       wind: { speed: 6.17, deg: 300 },
//       clouds: { all: 0 },
//       dt: 1659992909,
//       sys: {
//         type: 2,
//         id: 2016191,
//         country: "US",
//         sunrise: 1659964649,
//         sunset: 1660014559,
//       },
//       timezone: -25200,
//       id: 5344157,
//       name: "Dublin",
//       cod: 200,
//     })
//   );
// }
//   )
// );

test("Test for errors", () => {
  render(<WeatherIcon />);
  screen.debug();
});

// test("Test for errors", () => {
//   render(<WeatherIcon />);
//   screen.debug();
// });
