import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/index';
import api from '../../api';

export const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (email: string, password: string) => {
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

  return <AuthForm testId='signup' title='회원가입' onSubmit={handleSubmit} />;
};
