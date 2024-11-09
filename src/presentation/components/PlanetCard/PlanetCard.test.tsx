import { render } from "@testing-library/react";
import { PlanetCard } from "./PlanetCard";
import { UIPlanet } from "@src/presentation/hooks/usePlanets";
import { expect, vi } from "vitest";
import { ThemeProvider } from "styled-components";
import { theme } from "@src/presentation/styles/theme";

describe("PlanetCard component", () => {
  const mockPlanet: UIPlanet = {
    id: "1",
    name: "Earth",
    climate: "Temperate",
    gravity: "9.8 m/s²",
    diameter: 100,
    population: 100,
    url: "url",
    favorite: false,
  };

  it("should render planet details correctly", () => {
    const handleRemove = vi.fn();

    const { getByText, getByAltText } = render(
      <ThemeProvider theme={theme}>
        {" "}
        <PlanetCard planet={mockPlanet} handleRemove={handleRemove} />
      </ThemeProvider>
    );

    expect(getByText("Earth")).toBeInTheDocument();
    expect(getByText("Climate: Temperate")).toBeInTheDocument();
    expect(getByText("Gravity: 9.8 m/s²")).toBeInTheDocument();
    expect(getByAltText("Earth")).toBeInTheDocument();
  });
});
