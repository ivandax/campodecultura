import { render, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import { ThemeProvider } from "styled-components";
import { PlanetsTable } from "./PlanetsTable";
import { theme } from "@src/presentation/styles/theme";
import { UIPlanet } from "@src/presentation/hooks/usePlanets";
import { MemoryRouter } from "react-router-dom";

describe("PlanetsTable component", () => {
  const mockPlanets: UIPlanet[] = [
    {
      id: "1",
      name: "Earth",
      climate: "Temperate",
      diameter: 12742,
      population: 7900000000,
      favorite: false,
      url: "some",
      gravity: "test",
    },
    {
      id: "2",
      name: "Mars",
      climate: "Cold",
      diameter: 6779,
      population: 1000000,
      favorite: true,
      url: "some",
      gravity: "test",
    },
  ];
  const handleUpdatePlanets = vi.fn();
  const handleToggleFavoritePlanet = vi.fn();

  it("should render the table with correct headers and planet data", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/planets"]}>
          <PlanetsTable
            planets={mockPlanets}
            handleUpdatePlanets={handleUpdatePlanets}
            handleToggleFavoritePlanet={handleToggleFavoritePlanet}
          />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(getByText("Name")).toBeTruthy();
    expect(getByText("Climate")).toBeTruthy();
    expect(getByText("Diameter")).toBeTruthy();
    expect(getByText("Population")).toBeTruthy();
    expect(getByText("Favorite")).toBeTruthy();

    expect(getByText("Earth")).toBeTruthy();
    expect(getByText("Temperate")).toBeTruthy();
    expect(getByText("12742")).toBeTruthy();
    expect(getByText("7900000000")).toBeTruthy();
    expect(getByText("Mars")).toBeTruthy();
    expect(getByText("Cold")).toBeTruthy();
    expect(getByText("6779")).toBeTruthy();
    expect(getByText("1000000")).toBeTruthy();
  });

  it("should call handleUpdatePlanets with sorted planets when header labels are clicked", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/planets"]}>
          <PlanetsTable
            planets={mockPlanets}
            handleUpdatePlanets={handleUpdatePlanets}
            handleToggleFavoritePlanet={handleToggleFavoritePlanet}
          />
        </MemoryRouter>
      </ThemeProvider>
    );

    const diameterLabel = getByText("Diameter");
    fireEvent.click(diameterLabel);

    expect(handleUpdatePlanets).toHaveBeenCalledWith([
      mockPlanets[1],
      mockPlanets[0],
    ]);

    fireEvent.click(diameterLabel);
    expect(handleUpdatePlanets).toHaveBeenCalledWith(mockPlanets);
  });

  it("should call handleToggleFavoritePlanet when star icon is clicked", () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/planets"]}>
          <PlanetsTable
            planets={mockPlanets}
            handleUpdatePlanets={handleUpdatePlanets}
            handleToggleFavoritePlanet={handleToggleFavoritePlanet}
          />
        </MemoryRouter>
      </ThemeProvider>
    );

    const earthStarIcon = getByLabelText("Earth-mark-favorite");
    fireEvent.click(earthStarIcon);

    expect(handleToggleFavoritePlanet).toHaveBeenCalledWith(
      mockPlanets,
      mockPlanets[0].id
    );
  });
});
