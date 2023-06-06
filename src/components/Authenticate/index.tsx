import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthenticateProps {
  children: React.ReactNode;
}

export const Authenticate = ({ children }: AuthenticateProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname } = location;
    const accessToken = window.localStorage.getItem('access_token');

    if (pathname === '/signin' || pathname === '/signup') {
      if (accessToken) {
        navigate('/todo');
      }

      return;
    }

    if (pathname === '/todo') {
      if (!accessToken) {
        navigate('/signin');
      }

      return;
    }
  }, [location, navigate]);

  return <>{children}</>;
};
