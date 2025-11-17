import styled from "styled-components";

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 8px;
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
  max-width: 400px;
`;
