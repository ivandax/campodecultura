import styled from "styled-components";

export const PlanetDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 292px;
  background-color: ${(props) => props.theme.colors.lightprimary};
  height: 100vh;
  padding-top: 42px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 13px;
  width: 80%;
  height: 108px;
  background-color: ${(props) => props.theme.colors.white};
  padding: 0px 20px;
  border-radius: 8px;
`;

export const PlanetName = styled.h3`
  color: ${(props) => props.theme.colors.white};
`;
