import styled from "styled-components";

interface TableHeaderCellProps {
  $textAlign?: "center" | "left" | "right";
  $width?: number;
}

export const TableHeaderCell = styled.th<TableHeaderCellProps>`
  border-style: solid;
  border-color: #dddddd;
  border-width: 1px 0px;
  text-align: ${(props) => props.$textAlign ?? "left"};
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  width: ${(props) => `${props.$width}%` ?? "auto"};
`;
