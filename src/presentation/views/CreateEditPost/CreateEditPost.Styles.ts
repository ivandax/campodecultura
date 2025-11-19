import styled from "styled-components";

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  max-height: 100%;
  overflow: auto;

  input {
    padding: 4px;
  }

  textarea {
    padding: 4px;
  }
`;

export const PhotoPreview = styled.div`
  width: 200px;
`;

export const ActionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
`;

export const ConfigurationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
`;

export const ConfigurationBlock = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  background-color: ${(props) => props.theme.colors.superlightprimary};
  padding: 16px;
  border-radius: 8px;
  display: flex;
  gap: 16px;
`;

export const ConfigurationMessage = styled.div`
  padding: 4px;
  font-size: 12px;
`;
