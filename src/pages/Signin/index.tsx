import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/index';
import api from '../../api';

interface SigninProps {
  updateToken: (token: string) => void;
}

export const Signin = ({ updateToken }: SigninProps) => {
  const navigate = useNavigate();

  const handleSubmit = (email: string, password: string) => {
    api
      .postSignin({ email, password })
      .then((res) => {
        if (res.status === 200) {
          alert('로그인에 성공하였습니다.');
          updateToken(res.data.access_token);
          navigate('/todo');
        }
      })
      .catch((err) => {
        alert('요청에 실패하였습니다.');
        console.error(err);
      });
  };

  return <AuthForm testId='signin' title='로그인' onSubmit={handleSubmit} />;
};
