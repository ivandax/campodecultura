import styled from 'styled-components';

export const Banner = styled.div`
  padding: 14px 20px;
  background: ${({ theme }) => theme.colors.lightwarning || '#ffe8a3'};
  color: #000;
  font-weight: 500;
  text-align: center;
`;
