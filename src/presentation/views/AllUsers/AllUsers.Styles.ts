import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const TableCell = styled.td<{ $width?: number; $pointer?: boolean }>`
  padding: 16px;
  width: ${({ $width }) => ($width ? `${$width}%` : 'auto')};
  cursor: ${({ $pointer }) => ($pointer ? 'pointer' : 'default')};
`;

export const StatusChip = styled.span<{ $role?: string }>`
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: bold;
  background-color: ${({ $role }) => {
    switch ($role) {
      case 'ADMIN':
        return '#ffcdd2';
      case 'DEV':
        return '#e1bee7';
      default:
        return '#c8e6c9';
    }
  }};
  color: ${({ $role }) => {
    switch ($role) {
      case 'ADMIN':
        return '#c62828';
      case 'DEV':
        return '#6a1b9a';
      default:
        return '#2e7d32';
    }
  }};
`;
