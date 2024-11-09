import { useState, useEffect } from "react";

import { AsyncOp } from "@src/presentation/types/AsyncOp";
import { Planet } from "@src/domain/Planet";
import { getMockPlanets, getPlanets } from "@src/persistence/planets";

export type UIPlanet = Planet & { favorite: boolean };

export const usePlanets = () => {
  const useApiData = false;

  const [planets, setPlanets] = useState<AsyncOp<UIPlanet[], Error>>({
    status: "pending",
  });

  const handleUpdatePlanets = (planets: UIPlanet[]) => {
    setPlanets({ status: "successful", data: planets });
  };

  const handleToggleFavoritePlanet = (
    planets: UIPlanet[],
    planetId: string
  ) => {
    const newPlanets = planets.map((planet) => {
      if (planet.id === planetId) {
        return { ...planet, favorite: !planet.favorite };
      }
      return planet;
    });
    handleUpdatePlanets(newPlanets);
  };

  useEffect(() => {
    const handleGetPlanetsData = async () => {
      const result = useApiData ? await getPlanets() : getMockPlanets();

      if (result.error) {
        setPlanets({
          status: "failed",
          error: result.error,
        });
        return;
      }
      const uiPlanets = result.data.results.map((planet) => {
        const maybeId = planet.url.match(/(\d+)\/$/);
        const id = maybeId?.[1] ?? planet.url;
        return { ...planet, favorite: false, id };
      });
      setPlanets({
        status: "successful",
        data: uiPlanets,
      });
    };

    handleGetPlanetsData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { planets, handleUpdatePlanets, handleToggleFavoritePlanet };
};
