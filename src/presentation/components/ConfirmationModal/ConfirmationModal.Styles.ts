import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.div`
  background-color: white;
  width: 375px;
  border-radius: 8px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  border-radius: 8px 8px 0 0;
  background-color: ${(props) =>
    props.color === "warning"
      ? props.theme.colors.lightwarning
      : props.theme.colors.white};
`;

export const DescriptionWrapper = styled.p`
  padding: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
`;

export const CancelButton = styled.button`
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: none;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: underline;
  outline: none;
`;

export const ConfirmButton = styled.button`
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.warning};
  color: white;
  outline: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.warninghover};
  }
`;
