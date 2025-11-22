import { FaGoogle } from 'react-icons/fa';
import * as S from './GoogleSignInButton.Styles';

interface GoogleSignInButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function GoogleSignInButton({ onClick }: GoogleSignInButtonProps) {
  return (
    <S.GoogleSignInButton onClick={onClick} type="button">
      <S.IconWrapper>
        <FaGoogle />
      </S.IconWrapper>
      Google
    </S.GoogleSignInButton>
  );
}
