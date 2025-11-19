import styled from "styled-components";

export const PaperWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
  padding: 16px;
  min-height: 300px;
  background-color: ${(props) => props.theme.colors.white};
`;

export const Toolbar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

export const IconButton = styled.button`
  background: ${(props) => props.theme.colors.reallyLightBlue};
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  color: ${(props) => props.theme.colors.text};
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EditorArea = styled.div`
  min-height: 220px;
  outline: none;
  width: 100%;
  max-width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 1rem;
  line-height: 1.6;
`;
