import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.superlightprimary};
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  margin-bottom: 16px;
  color: #333;
`;

export const CommentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const CommentItem = styled.li`
  border-bottom: 1px solid #eee;
  padding: 8px 0;

  &:last-child {
    border-bottom: none;
  }
`;

export const CommentText = styled.p`
  margin: 0;
  color: #444;
`;

export const CommentDate = styled.small`
  color: #666;
  display: block;
  margin-top: 4px;
`;

export const Message = styled.p`
  color: #555;
  text-align: center;
`;

export const Error = styled.p`
  color: red;
  text-align: center;
`;

export const AddComment = styled.div`
  margin-top: 16px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
