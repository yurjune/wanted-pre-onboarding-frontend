import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Signup, Signin, Todo } from './pages';
import { useState } from 'react';

const App = () => {
  const [accessToken, setAccessToken] = useState(
    () => window.localStorage.getItem('access_token') ?? ''
  );

  const updateToken = (token: string) => {
    window.localStorage.setItem('access_token', token);
    setAccessToken(token);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='signup' element={accessToken ? <Navigate to='/todo' /> : <Signup />} />
        <Route
          path='signin'
          element={accessToken ? <Navigate to='/todo' /> : <Signin updateToken={updateToken} />}
        />
        <Route path='todo' element={accessToken ? <Todo /> : <Navigate to='/signin' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
