import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.superlightprimary};
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  margin-bottom: 12px;
  font-size: 16px;
`;

export const CommentsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const CommentItem = styled.li`
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 8px 0;

  &:last-child {
    border-bottom: none;
  }
`;

export const CommentContent = styled.li`
  flex-grow: 1;
`;

export const CommentText = styled.p`
  margin: 0;
`;

export const CommentDate = styled.small`
  color: #666;
  display: block;
  margin-top: 4px;
`;

export const Message = styled.p`
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

export const MenuContainer = styled.div`
  position: relative;

  &:hover > div {
    display: block;
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const PopupMenu = styled.div`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  background: white;
  border: 1px solid gray;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

export const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;
