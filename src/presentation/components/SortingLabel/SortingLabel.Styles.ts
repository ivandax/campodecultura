import styled, { css } from 'styled-components';
import { TableHeaderCell } from '../TableHeaderCell';

interface SortingTableHeaderCellProps {
  $active: boolean;
  $direction: 'asc' | 'desc' | undefined;
}

export const SortingLabelWrapper = styled(
  TableHeaderCell
)<SortingTableHeaderCellProps>`
  cursor: pointer;

  & > svg {
    opacity: 0;
  }

  ${(props) =>
    props.$active === false &&
    css`
      &:hover {
        & > svg {
          opacity: 0.6;
        }
      }
    `}

  ${(props) =>
    props.$active === true &&
    css`
      & > svg {
        opacity: 0.8;
        transform: ${props.$direction === 'desc' && 'rotateX(180deg)'};
        transition: transform 0.3s ease;
      }
    `}
`;
