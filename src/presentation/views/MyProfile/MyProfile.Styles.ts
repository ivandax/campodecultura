import { MainButton } from '@src/presentation/components/Buttons/MainButton';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
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
  gap: 12px;
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

export const Input = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  font-size: 14px;
  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

export const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid ${(props) => props.theme.colors.lightGray};
  margin: 16px 0;
  opacity: 0.5;
`;

export const LogoutSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
`;

export const LogoutTitle = styled.h3`
  color: ${(props) => props.theme.colors.red};
  font-size: 18px;
  font-weight: bold;
`;

export const LogoutText = styled.p`
  color: ${(props) => props.theme.colors.gray};
  font-size: 14px;
`;

export const LogoutButton = styled(MainButton)`
  background-color: ${(props) => props.theme.colors.red};
  &:hover {
    background-color: ${(props) => props.theme.colors.darkRed};
  }
`;
