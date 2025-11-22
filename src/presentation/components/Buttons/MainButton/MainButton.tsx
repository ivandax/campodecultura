import React from 'react';
import * as S from './MainButton.Styles';

function MainButton({
  children,
  onClick,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <S.MainButton onClick={onClick}>{children}</S.MainButton>;
}

export { MainButton };
