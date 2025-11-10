
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
  max-height: 100%;
  overflow: auto;
`;

export const IntroSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 700px;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  span {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const Subtitle = styled.h4`
  font-size: 18px;
  color: ${(props) => props.theme.colors.gray};
`;

export const Description = styled.p`
  line-height: 1.6;
  color: ${(props) => props.theme.colors.text};
`;

export const ActionBlock = styled.div`
  margin-top: 12px;
`;

export const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const FeatureCard = styled.div`
  flex: 1 1 200px;
  min-width: 200px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.reallyLightBlue};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  h4 {
    margin-bottom: 8px;
    color: ${(props) => props.theme.colors.primary};
  }

  p {
    color: ${(props) => props.theme.colors.text};
    font-size: 14px;
  }
`;
