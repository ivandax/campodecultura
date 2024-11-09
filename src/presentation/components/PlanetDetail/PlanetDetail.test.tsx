import { render } from "@testing-library/react";
import { PlanetDetail } from "./PlanetDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UIPlanet } from "@src/presentation/hooks/usePlanets";
import { ThemeProvider } from "styled-components";
import { theme } from "@src/presentation/styles/theme";
import { expect } from "vitest";

describe("PlanetDetail component", () => {
  it("should render error message when planet is not found", () => {
    const planets: UIPlanet[] = [
      {
        id: "1",
        name: "Earth",
        climate: "Temperate",
        gravity: "9.8 m/s²",
        diameter: 100,
        population: 100,
        url: "url",
        favorite: false,
      },
    ];
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/planets/x"]}>
          <Routes>
            <Route
              path="/planets/:planetId"
              element={<PlanetDetail planets={planets} />}
            />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(getByText("Error: Could not retrieve planet")).toBeInTheDocument();
  });

  it("should render planet details when planet is found", () => {
    const planets: UIPlanet[] = [
      {
        id: "1",
        name: "Earth",
        climate: "Temperate",
        gravity: "9.8 m/s²",
        diameter: 100,
        population: 100,
        url: "url",
        favorite: false,
      },
    ];
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/planets/1"]}>
          <Routes>
            <Route
              path="/planets/:planetId"
              element={<PlanetDetail planets={planets} />}
            />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(getByText("Earth")).toBeInTheDocument();
    expect(getByText("Climate: Temperate")).toBeInTheDocument();
    expect(getByText("Gravity: 9.8 m/s²")).toBeInTheDocument();
  });
});
