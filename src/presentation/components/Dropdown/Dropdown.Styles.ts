import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 200px;
  font-family: Lato;
`;

export const SelectedValue = styled.div<{ $isOpen: boolean }>`
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  ${({ $isOpen, theme }) =>
    $isOpen &&
    `
    border-color: ${theme.colors.primary};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`;

export const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const OptionItem = styled.li<{ $isSelected: boolean }>`
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.superlightprimary : theme.colors.white};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.superlightprimary};
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const ArrowIcon = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};

  svg {
    fill: ${({ theme }) => theme.colors.gray};
  }
`;
