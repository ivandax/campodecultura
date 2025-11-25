import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SignUpFormWrapper } from './SignUp.Styles';
import { useAuthStore } from '@src/presentation/store/authStore';
import { notifySuccess } from '@src/presentation/utils';
import { MainButton } from '@src/presentation/components/Buttons/MainButton';

function SignUp() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, userTask } = useAuthStore();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const maybeError = await signup(email, password);
    if (!maybeError) {
      notifySuccess(t('signup.successCreation'));
    }
  };

  return (
    <SignUpFormWrapper onSubmit={handleSignup}>
      <h5>{t('signup.title')}</h5>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('signup.emailPlaceholder')}
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t('signup.passwordPlaceholder')}
        required
      />
      <MainButton type="submit" disabled={userTask.status === 'in-progress'}>
        {userTask.status === 'in-progress'
          ? t('signup.creating')
          : t('signup.createAccountButton')}
      </MainButton>
    </SignUpFormWrapper>
  );
}

export { SignUp };
