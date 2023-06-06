import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup, Signin } from './pages';
import { Authenticate } from './components';

const App = () => {
  return (
    <BrowserRouter>
      <Authenticate>
        <Routes>
          <Route path='signup' element={<Signup />} />
          <Route path='signin' element={<Signin />} />
        </Routes>
      </Authenticate>
    </BrowserRouter>
  );
};

export default App;
