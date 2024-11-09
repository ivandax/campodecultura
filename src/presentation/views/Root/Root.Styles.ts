import styled, { createGlobalStyle  } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: Lato;
  }
`;

export const RootContainer = styled.div`
  height: 100vh;
  display: flex;
`;

export const MainContent = styled.div`
  flex: 1;
`;