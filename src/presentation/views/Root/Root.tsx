import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Sidebar } from "@src/presentation/components/Sidebar";
import { RootContainer, MainContent, GlobalStyle } from "./Root.Styles";
import { usePlanets } from "@src/presentation/hooks/usePlanets";
import { Planets } from "@src/presentation/views/Planets";
import { Favorites } from "@src/presentation/views/Favorites";
import { PlanetDetail } from "@src/presentation/components/PlanetDetail";

const Root: React.FC = () => {
  const { planets, handleUpdatePlanets, handleToggleFavoritePlanet } =
    usePlanets();

  return (
    <BrowserRouter>
      <GlobalStyle />
      <RootContainer>
        <Sidebar />
        <MainContent>
          <Routes>
            <Route
              path="/planets"
              element={
                <Planets
                  planets={planets}
                  handleUpdatePlanets={handleUpdatePlanets}
                  handleToggleFavoritePlanet={handleToggleFavoritePlanet}
                />
              }
            >
              <Route
                path=":planetId"
                element={<PlanetDetail planets={planets} />}
              />
            </Route>
            <Route
              path="/favorites"
              element={
                <Favorites
                  planets={planets}
                  handleToggleFavoritePlanet={handleToggleFavoritePlanet}
                />
              }
            />
            <Route path="/" element={<Navigate to="/planets" replace />} />
          </Routes>
        </MainContent>
      </RootContainer>
    </BrowserRouter>
  );
};

export { Root };
