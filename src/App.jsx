import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './routes/Login';
import Register from './routes/Register';

import { useLoginState } from './hooks/useLoginState';
import UserProfile from "./routes/UserProfile";

function App() {
  const isAuth = useLoginState();
  const AuthenticatedRoutes = () => {
    return isAuth ? <Outlet /> : <Login />;
  };
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthenticatedRoutes />}>
          <Route path="/user-profile" element={<UserProfile />} />

          <Route
            path="/"
            element={<h1>Hello Penpal here, Preview changes</h1>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
