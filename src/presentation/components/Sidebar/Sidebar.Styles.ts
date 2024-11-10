import styled, { css } from "styled-components";

export const SidebarWrapper = styled.div`
  width: 266px;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: column;
`;

export const SidebarTitle = styled.h1`
  color: ${(props) => props.theme.colors.lightgray};
  font-size: 22px;
  line-height: 31px;
  padding: 16px 24px;
`;

interface SidebarItemProps {
  $active: boolean;
}

export const SidebarItem = styled.li<SidebarItemProps>`
  color: ${(props) => props.theme.colors.lightgray};
  font-size: 14px;
  line-height: 17px;
  padding: 13px 24px;
  cursor: pointer;
  transition: background-color 0.3s ease-in;
  &:hover {
    background-color: ${(props) => props.theme.colors.lightprimary};
  }
  ${(props) =>
    props.$active &&
    css`
      background-color: ${(props) => props.theme.colors.lightprimary};
    `}
`;

export const SidebarItems = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const BottomSidebarItems = styled.ul`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
`;
