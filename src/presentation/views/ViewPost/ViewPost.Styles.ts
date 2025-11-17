import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 8px;
  max-height: 100%;
  overflow: auto;
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

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const AdminBlock = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.lightwarning};
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`;

export const Paper = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    list-style-type: disc !important;
  }
`;