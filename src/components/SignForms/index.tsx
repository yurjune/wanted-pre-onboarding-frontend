import { ChangeEvent } from 'react';
import styles from './index.module.scss';

interface SignFormProps {
  testId: 'signup' | 'signin';
  title: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  password: string;
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isButtonDisabled: boolean;
}

export const SignForm = (props: SignFormProps) => {
  const {
    testId,
    title,
    handleSubmit,
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    isButtonDisabled,
  } = props;

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
        <button data-testid={`${testId}-button`} type='submit' disabled={isButtonDisabled}>
          {title}
        </button>
      </div>
    </form>
  );
};
