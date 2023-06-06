import { useNavigate } from 'react-router-dom';
import { SignForm } from '../../components/index';
import { useInput } from '../../hooks/useInput';
import services from '../../service';

export const Signup = () => {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const navigate = useNavigate();

  const isValidate = /@+/i.test(email) && password.length >= 8;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidate) {
      return;
    }

    try {
      const res = await services.postSignup({ email, password });
      if (res.status === 201) {
        navigate('/signin');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SignForm
      testId='signup'
      title='회원가입'
      handleSubmit={handleSubmit}
      email={email}
      handleEmailChange={handleEmailChange}
      password={password}
      handlePasswordChange={handlePasswordChange}
      isButtonDisabled={!isValidate}
    />
  );
};