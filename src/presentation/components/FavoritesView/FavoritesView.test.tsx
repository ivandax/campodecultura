import { render } from "@testing-library/react";
import { expect, vi } from "vitest";
import { ThemeProvider } from "styled-components";
import { FavoritesView } from "./FavoritesView";
import { theme } from "@src/presentation/styles/theme";

describe("FavoritesView component", () => {
  const mockPlanets = [
    {
      id: "1",
      name: "Earth",
      climate: "Temperate",
      gravity: "9.8 m/s²",
      diameter: 100,
      population: 100,
      url: "url",
      favorite: true,
    },
    {
      id: "2",
      name: "Mars",
      climate: "Cold",
      gravity: "3.7 m/s²",
      diameter: 50,
      population: 50,
      url: "url",
      favorite: true,
    },
  ];

  it("should render FullView with 'No favorites' title when no planets are marked as favorites", () => {
    const handleToggleFavoritePlanet = vi.fn();
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <FavoritesView
          planets={[]}
          handleToggleFavoritePlanet={handleToggleFavoritePlanet}
        />
      </ThemeProvider>
    );

    expect(getByText("No favorites")).toBeTruthy();
  });

  it("should render PlanetCard for each favorite planet", () => {
    const handleToggleFavoritePlanet = vi.fn();
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <FavoritesView
          planets={mockPlanets}
          handleToggleFavoritePlanet={handleToggleFavoritePlanet}
        />
      </ThemeProvider>
    );

    expect(getByText("Earth")).toBeTruthy();
    expect(getByText("Mars")).toBeTruthy();
  });
});
