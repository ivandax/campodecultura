import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 8px;
  max-height: 100%;
  overflow: auto;
`;

export const LoadingWrapper = styled.div`
  padding: 16px;
`;

export const GrayWrapper = styled.p`
  padding: 8px 0;
  color: ${(props) => props.theme.colors.gray};
`;

export const Content = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

export const PhotoPreview = styled.div`
  width: 200px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const AdminBlock = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  background-color: ${(props) => props.theme.colors.superlightprimary};
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  h3 {
    margin: 0;
  }
`;

interface StatusChipProps {
  variant?: "draft" | "published" | "default";
}

export const StatusChip = styled.span<StatusChipProps>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) =>
    props.variant === "draft"
      ? props.theme.colors.blue
      : props.variant === "published"
      ? props.theme.colors.primary
      : props.theme.colors.gray};
`;

export const Paper = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

  ul {
    padding-left: 16px;
  }

  li {
    list-style-type: disc !important;
  }
`;
