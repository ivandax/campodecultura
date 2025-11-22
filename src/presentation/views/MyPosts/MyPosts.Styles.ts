import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 100%;
  overflow: auto;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
`;

export const Main = styled.div`
  flex-grow: 1;
`;

export const LoadingWrapper = styled.div`
  padding: 16px;
`;

export const MessageWrapper = styled.div`
  padding: 16px;
`;
