import styled from 'styled-components';

export const DeleteButton = styled.button<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) => ($isActive ? 'red' : 'gray')};
  color: white;
  padding: 8px;
  border: none;
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
  transition: background-color 0.3s ease;
  border-radius: 8px;

  &:disabled {
    cursor: not-allowed;
  }
`;
