import styled from 'styled-components';

export const TopbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  /* Hide in desktop */
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const BurgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  padding: 0;
`;

export const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

export const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
  z-index: 999;
`;
