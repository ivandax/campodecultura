import { FullView } from "@src/presentation/components/FullView";
import { ViewTitle } from "@src/presentation/components/ViewTitle";
import { AsyncOp } from "@src/presentation/types/AsyncOp";
import { Outlet } from "react-router-dom";
import { PlanetsMain, PlanetsViewWrapper } from "./Home.Styles";
import { Publication } from "@src/domain/Publication";
import { HomeTable } from "@src/presentation/components/HomeTable";

interface HomeProps {
  latestPublications: AsyncOp<Publication[], Error>;
}

function Home({ latestPublications }: HomeProps) {
  if (latestPublications.status === "pending" || latestPublications.status === "in-progress") {
    return <FullView title="Loading..." />;
  }

  if (latestPublications.status === "failed") {
    return <div>Error: Could not retrieve publications</div>;
  }

  return (
    <PlanetsViewWrapper>
      <PlanetsMain>
        <ViewTitle>Campo de Cultura</ViewTitle>
        <HomeTable
          publications={latestPublications.data}
        />
      </PlanetsMain>
      <Outlet />
    </PlanetsViewWrapper>
  );
}

export { Home };
