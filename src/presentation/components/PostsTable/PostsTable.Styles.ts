import styled, { css } from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

interface TableCellProps {
  $textAlign?: "center" | "left" | "right";
  $pointer?: boolean;
  $width?: number;
}

export const TableCell = styled.td<TableCellProps>`
  border-style: solid;
  border-color: #dddddd;
  border-width: 1px 0px;
  text-align: ${(props) => props.$textAlign ?? "left"};
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  width: ${(props) => (props.$width ? `${props.$width}%` : "auto")};
  ${(props) =>
    props.$pointer &&
    css`
      cursor: pointer;
    `}
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: ${(props) => props.theme.colors.lightgray};
  }
`;
