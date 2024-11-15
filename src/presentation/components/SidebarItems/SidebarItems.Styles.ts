import styled, { css } from "styled-components";

interface SidebarItemProps {
  $active: boolean;
  $displayOn: "desktop" | "mobile";
}

export const SidebarItem = styled.li<SidebarItemProps>`
  color: ${({ theme, $displayOn }) =>
    $displayOn === "mobile" ? theme.colors.black : theme.colors.lightgray};
  font-size: 14px;
  line-height: 17px;
  padding: 13px 24px;
  cursor: pointer;
  transition: background-color 0.3s ease-in;

  &:hover {
    background-color: ${({ theme, $displayOn }) =>
      $displayOn === "mobile"
        ? theme.colors.lightgray
        : theme.colors.lightprimary};
  }
  ${(props) =>
    props.$active &&
    css`
      background-color: ${({ theme }) =>
        props.$displayOn === "mobile"
          ? theme.colors.lightgray
          : props.theme.colors.lightprimary};
    `}
`;

export const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
`;
