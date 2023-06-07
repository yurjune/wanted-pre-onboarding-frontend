import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Signup, Signin, Todo } from './pages';
import { createContext, useState } from 'react';

export const TokenContext = createContext((token: string) => {});

const App = () => {
  const [accessToken, setAccessToken] = useState(
    () => window.localStorage.getItem('access_token') ?? ''
  );

  const updateToken = (token: string) => {
    window.localStorage.setItem('access_token', token);
    setAccessToken(token);
  };

  return (
    <TokenContext.Provider value={updateToken}>
      <BrowserRouter>
        <Routes>
          <Route path='signup' element={accessToken ? <Navigate to='/todo' /> : <Signup />} />
          <Route path='signin' element={accessToken ? <Navigate to='/todo' /> : <Signin />} />
          <Route path='todo' element={accessToken ? <Todo /> : <Navigate to='/signin' />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
};

export default App;
