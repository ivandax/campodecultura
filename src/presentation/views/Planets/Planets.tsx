import { FullView } from "@src/presentation/components/FullView";
import { PlanetsTable } from "@src/presentation/components/PlanetsTable";
import { ViewTitle } from "@src/presentation/components/ViewTitle";
import { UIPlanet } from "@src/presentation/hooks/usePlanets";
import { AsyncOp } from "@src/presentation/types/AsyncOp";
import { Outlet } from "react-router-dom";
import { PlanetsMain, PlanetsViewWrapper } from "./Planets.Styles";

interface PlanetsProps {
  planets: AsyncOp<UIPlanet[], Error>;
  handleUpdatePlanets: (planets: UIPlanet[]) => void;
  handleToggleFavoritePlanet: (planets: UIPlanet[], planetId: string) => void;
}

function Planets({
  planets,
  handleUpdatePlanets,
  handleToggleFavoritePlanet,
}: PlanetsProps) {
  if (planets.status === "pending" || planets.status === "in-progress") {
    return <FullView title="Loading..." />;
  }

  if (planets.status === "failed") {
    return <div>Error: Could not retrieve planets</div>;
  }

  return (
    <PlanetsViewWrapper>
      <PlanetsMain>
        <ViewTitle>Planets</ViewTitle>
        <PlanetsTable
          planets={planets.data}
          handleUpdatePlanets={handleUpdatePlanets}
          handleToggleFavoritePlanet={handleToggleFavoritePlanet}
        />
      </PlanetsMain>
      <Outlet />
    </PlanetsViewWrapper>
  );
}

export { Planets };
