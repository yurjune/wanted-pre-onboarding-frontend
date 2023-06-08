import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/index';
import { useInput } from '../../hooks/useInput';
import api from '../../api';

interface SigninProps {
  updateToken: (token: string) => void;
}

export const Signin = ({ updateToken }: SigninProps) => {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const navigate = useNavigate();

  const isValidated = /@+/i.test(email) && password.length >= 8;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidated) {
      return;
    }

    api
      .postSignin({ email, password })
      .then((res) => {
        if (res.status === 200) {
          updateToken(res.data.access_token);
          navigate('/todo');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <AuthForm
      testId='signin'
      title='로그인'
      handleSubmit={handleSubmit}
      email={email}
      handleEmailChange={handleEmailChange}
      password={password}
      handlePasswordChange={handlePasswordChange}
      isButtonDisabled={!isValidated}
    />
  );
};
