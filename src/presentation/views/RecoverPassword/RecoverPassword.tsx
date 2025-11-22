import { useState } from 'react';
import { RequestPasswordWrapper } from './RecoverPassword.Styles';
import { notifyError, notifySuccess } from '@src/presentation/utils';
import { requestPasswordReset } from '@src/persistence/auth';
import { MainButton } from '@src/presentation/components/Buttons/MainButton';

function RecoverPassword() {
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
      notifyError('Could not request a reset of password');
      return;
    }
    setIsDisabled(true);
    notifySuccess('Request to reset password sent! Please check your inbox');
  };

  return (
    <RequestPasswordWrapper onSubmit={handleResetPassword}>
      <h5>Request reset of password</h5>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        disabled={isDisabled}
      />
      <MainButton type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Request'}
      </MainButton>
    </RequestPasswordWrapper>
  );
}

export { RecoverPassword };
