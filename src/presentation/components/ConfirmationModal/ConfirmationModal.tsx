import { MainButton } from "../Buttons/MainButton";
import { CloseIcon } from "../CloseIcon";
import { IconButton } from "../IconButton";
import { BodyText, H2CategoryTitle } from "../Texts";
import {
  ButtonContainer,
  CancelButton,
  DescriptionWrapper,
  ModalBox,
  ModalOverlay,
  TitleWrapper,
} from "./ConfirmationModal.Styles";

interface ConfirmationModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  return (
    <ModalOverlay>
      <ModalBox>
        <TitleWrapper color="primary">
          <H2CategoryTitle color="primary">{title}</H2CategoryTitle>
          <IconButton
            onClick={onCancel}
            icon={<CloseIcon width="20px" height="20px" />}
          />
        </TitleWrapper>

        <DescriptionWrapper>
          <BodyText>{description}</BodyText>
        </DescriptionWrapper>

        <ButtonContainer>
          <CancelButton onClick={onCancel} aria-label="cancel">
            Cancel
          </CancelButton>
          <MainButton onClick={onConfirm} aria-label="confirm">
            Confirm
          </MainButton>
        </ButtonContainer>
      </ModalBox>
    </ModalOverlay>
  );
};

export { ConfirmationModal };
