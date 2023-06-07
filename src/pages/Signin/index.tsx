import { useNavigate } from 'react-router-dom';
import { SignForm } from '../../components/index';
import { useInput } from '../../hooks/useInput';
import services from '../../service';
import { useContext } from 'react';
import { TokenContext } from '../../App';

export const Signin = () => {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const updateToken = useContext(TokenContext);
  const navigate = useNavigate();

  const isValidated = /@+/i.test(email) && password.length >= 8;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidated) {
      return;
    }

    services
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
    <SignForm
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
