import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/index';
import { useInput } from '../../hooks/useInput';
import api from '../../api';

export const Signup = () => {
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
      .postSignup({ email, password })
      .then((res) => {
        if (res.status === 201) {
          alert('회원가입에 성공하였습니다.');
          navigate('/signin');
        }
      })
      .catch((err) => {
        alert('요청에 실패하였습니다.');
        console.error(err);
      });
  };

  return (
    <AuthForm
      testId='signup'
      title='회원가입'
      handleSubmit={handleSubmit}
      email={email}
      handleEmailChange={handleEmailChange}
      password={password}
      handlePasswordChange={handlePasswordChange}
      isButtonDisabled={!isValidated}
    />
  );
};
