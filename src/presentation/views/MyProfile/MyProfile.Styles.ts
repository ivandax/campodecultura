import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  max-height: 100%;
  overflow: auto;
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

export const Subtitle = styled.p`
  color: ${(props) => props.theme.colors.gray};
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.reallyLightBlue};
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
`;

export const InfoLine = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
`;

export const ActionBlock = styled.div`
  margin-top: 16px;
`;
