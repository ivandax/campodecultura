import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './Login.Styles';
import { useAuthStore } from '@src/presentation/store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import { notifyError } from '@src/presentation/utils';
import { MainButton } from '@src/presentation/components/Buttons/MainButton';
import { GoogleSignInButton } from '@src/presentation/components/Buttons/GoogleSignInButton';

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, userTask, loginWithGoogle } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) {
      navigate('/home');
    } else {
      notifyError(t('login.errorLogin'));
    }
  };

  const handleGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await loginWithGoogle();
    if (user) {
      navigate('/home');
    } else {
      notifyError(t('login.errorGoogle'));
    }
  };

  return (
    <S.LoginFormWrapper>
      <h5>{t('login.title')}</h5>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('login.emailPlaceholder')}
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t('login.passwordPlaceholder')}
        required
      />
      <MainButton
        disabled={userTask.status === 'in-progress'}
        onClick={handleLogin}
      >
        {userTask.status === 'in-progress'
          ? t('login.loggingIn')
          : t('login.loginButton')}
      </MainButton>
      <Link to="/recover-password">{t('login.forgotPassword')}</Link>
      <S.SocialActionsWrapper>
        <span>{t('login.otherOptions')}</span>
        <GoogleSignInButton onClick={handleGoogleLogin} />
      </S.SocialActionsWrapper>
    </S.LoginFormWrapper>
  );
}

export { Login };
