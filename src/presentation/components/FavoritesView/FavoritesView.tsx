import { UIPlanet } from "@src/presentation/hooks/usePlanets";
import { FullView } from "@src/presentation/components/FullView";
import { PlanetCard } from "@src/presentation/components/PlanetCard";
import { PlanetCards } from "./FavoritesView.Styles";
import { ModalState } from "@src/presentation/types/ModalState";
import { useState } from "react";
import { ConfirmationModal } from "../ConfirmationModal";

interface FavoritesViewProps {
  planets: UIPlanet[];
  handleToggleFavoritePlanet: (planets: UIPlanet[], planetId: string) => void;
}

const FavoritesView: React.FC<FavoritesViewProps> = ({
  planets,
  handleToggleFavoritePlanet,
}) => {
  const [removeModalState, setRemoveModalState] = useState<
    ModalState<UIPlanet>
  >({
    open: false,
    item: null,
  });
  if (planets.filter((planet) => planet.favorite).length === 0) {
    return <FullView title="No favorites" />;
  }

  return (
    <>
      {removeModalState.open && (
        <ConfirmationModal
          title="Remove favorite"
          description="Planet will be removed from favorites"
          onCancel={() => setRemoveModalState({ open: false, item: null })}
          onConfirm={() => {
            handleToggleFavoritePlanet(planets, removeModalState.item.id);
            setRemoveModalState({ open: false, item: null });
          }}
        />
      )}
      <PlanetCards>
        {planets
          .filter((planet) => planet.favorite)
          .map((planet) => (
            <PlanetCard
              key={planet.name}
              planet={planet}
              handleRemove={() =>
                setRemoveModalState({ open: true, item: planet })
              }
            />
          ))}
      </PlanetCards>
    </>
  );
};

export { FavoritesView };
