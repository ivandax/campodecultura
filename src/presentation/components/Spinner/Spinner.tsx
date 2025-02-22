import * as S from "./Spinner.Styles";

interface SpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

const Spinner = ({ size, color, className }: SpinnerProps) => {
  return <S.StyledSpinner $size={size} $color={color} className={className} />;
};

export { Spinner };
