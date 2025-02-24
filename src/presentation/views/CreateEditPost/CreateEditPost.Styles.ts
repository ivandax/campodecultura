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
