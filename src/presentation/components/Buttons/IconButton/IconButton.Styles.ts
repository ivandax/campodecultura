import styled from 'styled-components';

export const IconButtonWrapper = styled.button`
  padding: 8px;
  border: none;
  transition: background-color 0.3s ease;
  background-color: transparent;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.lightgray};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.lightgray};
  }
`;
