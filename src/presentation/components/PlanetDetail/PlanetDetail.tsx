import { useParams } from "react-router-dom";
import { PlanetDetailWrapper, PlanetName, Card } from "./PlanetDetail.Styles";
import { UIPlanet } from "@src/presentation/hooks/usePlanets";
import { Spacer } from "@src/presentation/components/Spacer";
import { H2CategoryTitle, H3, SmallText } from "../Texts";
import { AsyncOp } from "@src/presentation/types/AsyncOp";

interface PlanetDetailProps {
  planets: AsyncOp<UIPlanet[], Error>;
}

function PlanetDetail({ planets }: PlanetDetailProps) {
  const params = useParams();

  if (planets.status !== "successful") {
    return (
      <PlanetDetailWrapper>
        <PlanetName>Loading...</PlanetName>
      </PlanetDetailWrapper>
    );
  }

  const planet = planets.data.find((planet) => planet.id === params?.planetId);

  if (!planet) {
    return (
      <PlanetDetailWrapper>
        <PlanetName>Error: Could not retrieve planet</PlanetName>
      </PlanetDetailWrapper>
    );
  }

  return (
    <PlanetDetailWrapper>
      <H2CategoryTitle color="white">{planet.name}</H2CategoryTitle>
      <Spacer height={42} />
      <Card>
        <H3 color="black">{`Climate: ${planet.climate}`}</H3>
        <SmallText color="black">{`Gravity: ${planet.gravity}`}</SmallText>
      </Card>
    </PlanetDetailWrapper>
  );
}

export { PlanetDetail };
