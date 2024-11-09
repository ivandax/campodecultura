import { Sorting } from "@src/presentation/types/Sorting";
import { SortingLabelWrapper } from "./SortingLabel.Styles";
import { SortIcon } from "@src/presentation/components/SortIcon";
import { BodyText } from "@src/presentation/components/Texts";

interface SortingLabelProps<T> {
  currentSorting: Sorting<T> | null;
  property: T;
  onUpdateSorting: (property: T) => void;
  label: string;
  width?: number;
}

function SortingLabel<T>({
  currentSorting,
  property,
  onUpdateSorting,
  label,
  width,
}: SortingLabelProps<T>) {
  return (
    <SortingLabelWrapper
      $active={currentSorting?.property === property}
      $direction={
        currentSorting?.property === property ? currentSorting.direction : "asc"
      }
      onClick={() => onUpdateSorting(property)}
      $width={width}
    >
      <BodyText color={"gray"}>{label}</BodyText>
      <SortIcon />
    </SortingLabelWrapper>
  );
}

export { SortingLabel };
