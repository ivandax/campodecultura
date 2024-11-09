import { useState } from "react";

import { UIPlanet } from "@src/presentation/hooks/usePlanets";
import { Table, TableCell, TableRow } from "./PlanetsTable.Styles";
import { BodyText, H2CategoryTitle } from "@src/presentation/components/Texts";
import { Sorting } from "@src/presentation/types/Sorting";
import { StarIcon } from "@src/presentation/components/StarIcon";
import { SortingLabel } from "@src/presentation/components/SortingLabel";
import { TableHeaderCell } from "@src/presentation/components/TableHeaderCell";
import { useNavigate, useParams } from "react-router-dom";

interface PlanetsTableProps {
  planets: UIPlanet[];
  handleUpdatePlanets: (planets: UIPlanet[]) => void;
  handleToggleFavoritePlanet: (planets: UIPlanet[], planetId: string) => void;
}

function PlanetsTable({
  planets,
  handleUpdatePlanets,
  handleToggleFavoritePlanet,
}: PlanetsTableProps) {
  const navigate = useNavigate();
  const params = useParams();
  type SortableProperties = "diameter" | "population";
  const [sorting, setSorting] = useState<Sorting<SortableProperties> | null>(
    null
  );

  function sortByProperty(
    planets: UIPlanet[],
    property: SortableProperties,
    direction: "asc" | "desc"
  ): UIPlanet[] {
    return planets.sort((a, b) => {
      if (direction === "asc") {
        return a[property] - b[property];
      } else {
        return b[property] - a[property];
      }
    });
  }

  const updateSorting = (property: SortableProperties) => {
    const newDirection =
      sorting === null ? "asc" : sorting.direction === "asc" ? "desc" : "asc";

    const sortedPlanets = sortByProperty([...planets], property, newDirection);

    setSorting({
      property,
      direction: newDirection,
    });

    handleUpdatePlanets(sortedPlanets);
  };

  const toggleShowPlanetDetail = (planet: UIPlanet) => {
    if (params?.planetId && params.planetId === planet.id) {
      navigate("/planets");
      return;
    }
    navigate(`/planets/${planet.id}`);
  };

  return (
    <Table>
      <thead>
        <tr>
          <TableHeaderCell $width={20}>
            <BodyText color={"gray"}>Name</BodyText>
          </TableHeaderCell>
          <TableHeaderCell $width={20}>
            <BodyText color={"gray"}>Climate</BodyText>
          </TableHeaderCell>
          <SortingLabel
            label={"Diameter"}
            currentSorting={sorting}
            property={"diameter"}
            onUpdateSorting={updateSorting}
          />
          <SortingLabel
            label={"Population"}
            currentSorting={sorting}
            property={"population"}
            onUpdateSorting={updateSorting}
            width={20}
          />
          <TableHeaderCell $textAlign="center" $width={20}>
            <BodyText color={"gray"}>Favorite</BodyText>
          </TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {planets.map((planet) => (
          <TableRow key={planet.url}>
            <TableCell $pointer onClick={() => toggleShowPlanetDetail(planet)} $width={20}>
              <H2CategoryTitle>{planet.name}</H2CategoryTitle>
            </TableCell>
            <TableCell $pointer onClick={() => toggleShowPlanetDetail(planet)} $width={20}>
              <BodyText>{planet.climate}</BodyText>
            </TableCell>
            <TableCell $pointer onClick={() => toggleShowPlanetDetail(planet)} $width={20}>
              <BodyText>{planet.diameter}</BodyText>
            </TableCell>
            <TableCell $pointer onClick={() => toggleShowPlanetDetail(planet)} $width={20}>
              <BodyText>{planet.population}</BodyText>
            </TableCell>
            <TableCell
              role="button"
              aria-label={`${planet.name}-mark-favorite`}
              $textAlign="center"
              $pointer
              onClick={() => handleToggleFavoritePlanet(planets, planet.id)}
              $width={20}
            >
              <StarIcon active={planet.favorite} />
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

export { PlanetsTable };
