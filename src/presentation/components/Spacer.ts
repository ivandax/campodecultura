import styled from 'styled-components';

interface SpacerProps {
  height: number;
}

export const Spacer = styled.div<SpacerProps>`
  height: ${(props) => props.height}px;
`;
