import styled from "styled-components";

export const MainButton = styled.button`
  padding: 8px;
  border: none;
  color: ${(props) => props.theme.colors.lightgray};
  background-color: ${(props) => props.theme.colors.primary};
  transition: background-color 0.3s ease;
  border-radius: 8px;
  min-width: 150px;

  &:disabled {
    cursor: not-allowed;
  }
`;
