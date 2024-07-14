import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login";
import Register from "./routes/Register";

import { useLoginState } from "./hooks/useLoginState";
import UserProfile from "./routes/UserProfile/UserProfile";
import { Navbar } from "./components/mainComponents/Navbar";

function App() {
  const AuthenticatedRoutes = () => {
    const isAuth = useLoginState();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthenticatedRoutes />}>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route
            path="/"
            element={<p className="w-fit m-auto mt-12">this the home page</p>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
