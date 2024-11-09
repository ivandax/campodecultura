import styled from "styled-components";

export const PlanetCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 16px;
  width: 328px;
`;

export const PlanetImage = styled.img`
  width: 100%;
  height: auto;
`;

export const PlanetCardTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PlanetCardDetailsWrapper = styled.div`
  padding-left: 16px;
  padding-right: 16px;
`;
