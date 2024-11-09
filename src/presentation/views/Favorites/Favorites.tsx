import { FavoritesView } from "@src/presentation/components/FavoritesView/FavoritesView";
import { FullView } from "@src/presentation/components/FullView";
import { ViewTitle } from "@src/presentation/components/ViewTitle";
import { UIPlanet } from "@src/presentation/hooks/usePlanets";
import { AsyncOp } from "@src/presentation/types/AsyncOp";
import { FavoritesWrapper, TitleWrapper } from "./Favorites.Styles";

interface FavoritesProps {
  planets: AsyncOp<UIPlanet[], Error>;
  handleToggleFavoritePlanet: (planets: UIPlanet[], planetId: string) => void;
}

function Favorites({ planets, handleToggleFavoritePlanet }: FavoritesProps) {
  if (planets.status === "pending" || planets.status === "in-progress") {
    return <FullView title="Loading..." />;
  }

  if (planets.status === "failed") {
    return <div>Error: Could not retrieve planets</div>;
  }

  return (
    <FavoritesWrapper>
      <TitleWrapper>
        <ViewTitle>Favorites</ViewTitle>
      </TitleWrapper>

      <FavoritesView
        planets={planets.data}
        handleToggleFavoritePlanet={handleToggleFavoritePlanet}
      />
    </FavoritesWrapper>
  );
}

export { Favorites };
