import { TextareaHTMLAttributes, forwardRef } from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  width: 300px;
  min-height: 80px;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.2s;
  &:focus {
    border-color: #888;
    outline: none;
  }
`;

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => <StyledTextArea ref={ref} {...props} />
);

TextArea.displayName = 'TextArea';
