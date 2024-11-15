import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: Lato;
  }
`;

export const RootContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  /* Row in desktop */
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const MainContent = styled.div`
  flex: 1;
`;
