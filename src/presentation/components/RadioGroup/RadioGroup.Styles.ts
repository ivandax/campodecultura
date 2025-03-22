import styled from "styled-components";

export const RadioGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RadioWrapper = styled.label<{
  $color?: string;
  $backgroundColor?: string;
  $borderColor?: string;
}>`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: 8px;

  input {
    display: none;
  }

  span {
    width: 16px;
    height: 16px;
    border: 2px solid
      ${({ theme, $borderColor }) => $borderColor ?? theme.colors.blue};
    background-color: ${({ theme, $backgroundColor }) =>
      $backgroundColor ?? theme.colors.white};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, border-color 0.3s;

    svg {
      display: none;
      fill: ${(props) => props.$color};
    }
  }

  input:checked + span {
    border-color: ${(props) => props.$color};

    svg {
      display: block;
      fill: ${(props) => props.$color};
    }
  }
`;
