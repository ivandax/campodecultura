import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // or any other spinner icon you prefer
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const StyledSpinner = styled(AiOutlineLoading3Quarters)<{
  $size?: number;
  $color?: string;
}>`
  animation: ${spin} 1s linear infinite;
  width: ${(props) => props.$size ?? 16}px;
  height: ${(props) => props.$size ?? 16}px;
  color: ${(props) => props.color ?? '#3b82f6'};
`;
