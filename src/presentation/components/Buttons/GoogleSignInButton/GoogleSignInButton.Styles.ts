import styled from 'styled-components';

export const GoogleSignInButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  /* Google Branding */
  color: black; /* White text */
  border: 1px solid #4285f4;

  &:hover {
    background-color: lightgray; /* Slightly darker blue on hover */
  }
`;

export const IconWrapper = styled.span`
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 18px; /* Adjust size of the icon */
`;
