import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RequestPasswordWrapper } from './RecoverPassword.Styles';
import { notifyError, notifySuccess } from '@src/presentation/utils';
import { requestPasswordReset } from '@src/persistence/auth';
import { MainButton } from '@src/presentation/components/Buttons/MainButton';

function RecoverPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    if (email === '') return;
    e.preventDefault();
    setIsLoading(true);
    const result = await requestPasswordReset(email);
    setIsLoading(false);
    if (result.error) {
      notifyError(t('recoverPassword.errorRequest'));
      return;
    }
    setIsDisabled(true);
    notifySuccess(t('recoverPassword.successRequest'));
  };

  return (
    <RequestPasswordWrapper onSubmit={handleResetPassword}>
      <h5>{t('recoverPassword.title')}</h5>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('recoverPassword.emailPlaceholder')}
        required
        disabled={isDisabled}
      />
      <MainButton type="submit" disabled={isLoading}>
        {isLoading
          ? t('recoverPassword.sending')
          : t('recoverPassword.requestButton')}
      </MainButton>
    </RequestPasswordWrapper>
  );
}

export { RecoverPassword };
