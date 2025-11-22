import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  width: 266px;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  flex-direction: column;

  /* Hide sidebar in mobile */
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const SidebarTitle = styled.h1`
  color: ${(props) => props.theme.colors.lightgray};
  font-size: 22px;
  line-height: 31px;
  padding: 16px 24px;
`;
