import { UIPlanet } from "@src/presentation/hooks/usePlanets";
import {
  PlanetCardDetailsWrapper,
  PlanetCardTitle,
  PlanetCardWrapper,
  PlanetImage,
} from "./PlanetCard.Styles";
import { H2CategoryTitle, SmallText } from "../Texts";
import { CloseIcon } from "@src/presentation/components/CloseIcon";
import { IconButton } from "@src/presentation/components/IconButton";
import { Spacer } from "@src/presentation/components/Spacer";
import planetImage from "@src/assets/images/planet.png";

interface PlanetCardProps {
  planet: UIPlanet;
  handleRemove: () => void;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ planet, handleRemove }) => {
  return (
    <PlanetCardWrapper>
      <Spacer height={16} />
      <PlanetCardDetailsWrapper>
        <PlanetCardTitle>
          <H2CategoryTitle>{planet.name}</H2CategoryTitle>
          <IconButton
            onClick={handleRemove}
            icon={<CloseIcon />}
            ariaLabel={`remove-${planet.name}`}
          />
        </PlanetCardTitle>
      </PlanetCardDetailsWrapper>

      <Spacer height={5} />
      <PlanetCardDetailsWrapper>
        <SmallText color="gray">{planet.climate}</SmallText>
      </PlanetCardDetailsWrapper>

      <Spacer height={8} />
      <PlanetImage src={planetImage} alt={planet.name} />
      <PlanetCardDetailsWrapper>
        <Spacer height={8} />
        <SmallText>Climate: {planet.climate}</SmallText>
        <Spacer height={8} />
        <SmallText>Gravity: {planet.gravity}</SmallText>
        <Spacer height={16} />
      </PlanetCardDetailsWrapper>
    </PlanetCardWrapper>
  );
};

export { PlanetCard };
