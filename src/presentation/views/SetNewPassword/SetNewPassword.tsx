import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as S from './SetNewPassword.Styles';
import { notifyError, notifySuccess } from '@src/presentation/utils';
import {
  completePasswordReset,
  verifyPasswordCode,
} from '@src/persistence/auth';
import { MainButton } from '@src/presentation/components/Buttons/MainButton';

function SetNewPassword() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  const [newPassword, setNewPassword] = useState('');
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      if (!oobCode) {
        notifyError(t('setNewPassword.errorInvalidLink'));
        navigate('/');
        return;
      }

      try {
        await verifyPasswordCode(oobCode);
      } catch {
        notifyError(t('setNewPassword.errorExpiredLink'));
        navigate('/');
      }

      setIsVerifying(false);
    };

    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oobCode, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oobCode) return;

    if (newPassword.length < 6) {
      notifyError(t('setNewPassword.errorPasswordLength'));
      return;
    }

    setIsSubmitting(true);

    const result = await completePasswordReset(oobCode, newPassword);

    setIsSubmitting(false);

    if (result.error) {
      notifyError(t('setNewPassword.errorReset'));
      return;
    }

    notifySuccess(t('setNewPassword.successReset'));
  };

  if (isVerifying) {
    return <S.Wrapper>{t('setNewPassword.verifying')}</S.Wrapper>;
  }

  return (
    <S.Wrapper onSubmit={handleSubmit}>
      <h5>{t('setNewPassword.title')}</h5>

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder={t('setNewPassword.passwordPlaceholder')}
        required
      />

      <MainButton type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? t('setNewPassword.updating')
          : t('setNewPassword.setPasswordButton')}
      </MainButton>
    </S.Wrapper>
  );
}

export { SetNewPassword };
