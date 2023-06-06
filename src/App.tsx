import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup, Signin } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
