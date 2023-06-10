import { FormEventHandler } from 'react';
import styles from './index.module.scss';
import { useInput } from '../../hooks/useInput';

interface AuthFormProps {
  testId: 'signup' | 'signin';
  title: string;
  onSubmit: (email: string, pw: string) => void;
}

export const AuthForm = ({ testId, title, onSubmit }: AuthFormProps) => {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  const isValidated = /@+/i.test(email) && password.length >= 8;

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (isValidated) {
      onSubmit(email, password);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <label htmlFor='email'>Email:</label>
      <input
        data-testid='email-input'
        id='email'
        type='text'
        value={email}
        onChange={handleEmailChange}
        placeholder='example@domain.com'
      />
      <label htmlFor='password'>Password:</label>
      <input
        data-testid='password-input'
        id='password'
        type='password'
        value={password}
        onChange={handlePasswordChange}
      />
      <div className={styles.buttonWrapper}>
        <button data-testid={`${testId}-button`} type='submit' disabled={!isValidated}>
          {title}
        </button>
      </div>
    </form>
  );
};
