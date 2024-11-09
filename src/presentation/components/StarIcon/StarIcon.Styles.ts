import styled from "styled-components";

interface StarProps {
    active: boolean;
  }

export const StarSVG = styled.svg<StarProps>`
  path {
    fill: ${(props) => (props.active ? "#E4D237" : "none")};
    stroke: #E4D237";
  }
`;
