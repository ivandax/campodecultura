import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 8px;
  overflow: scroll;
  max-height: 100%;
`;

export const LoadingWrapper = styled.div`
  padding: 16px;
`;

export const GrayWrapper = styled.p`
  padding: 8px 0;
  color: ${(props) => props.theme.colors.gray};
`;

export const Content = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

export const PhotoPreview = styled.div`
  width: 200px;
`;

export const AdminBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.gray};
`;
