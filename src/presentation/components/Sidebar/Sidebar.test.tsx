import { render } from "@testing-library/react";
import { expect } from "vitest";
import { ThemeProvider } from "styled-components";
import { Sidebar } from "./Sidebar";
import { theme } from "@src/presentation/styles/theme";
import { MemoryRouter } from "react-router-dom";

describe("Sidebar component", () => {
  it("should render the sidebar with correct title and active items", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/planets/1"]}>
        <ThemeProvider theme={theme}>
          <Sidebar />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(getByText("Planets App")).toBeTruthy();
    expect(getByText("Planets")).toBeTruthy();
    expect(getByText("Favorites")).toBeTruthy();
  });
});
