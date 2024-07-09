import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './routes/Login';
import Register from './routes/Register';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from './state/slices/userSlice';
import { setAuth } from './state/slices/authSlice';
import { useLoginState } from './hooks/useLoginState';

function App() {
  const isAuth = useLoginState();
  const AuthenticatedRoutes = () => {
    return isAuth ? <Outlet /> : <Login />;
  };
  return (
    <div className=''>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<AuthenticatedRoutes />}>
          <Route
            path='/'
            element={<h1>Hello Penpal here, Preview changes</h1>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
