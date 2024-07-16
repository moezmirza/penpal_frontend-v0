import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login";
import Register from "./routes/Register";

import { useLoginState } from "./hooks/useLoginState";
import UserProfile from "./routes/User/Profile/Profile";
import { Navbar } from "./components/mainComponents/Navbar";
import FindPal from "./routes/User/FindPal/FindPal";
import Customer from "./routes/Customer/Customer";

function App() {
  const AuthenticatedRoutes = () => {
    const isAuth = useLoginState();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthenticatedRoutes />}>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/find-pal" element={<FindPal />} />
          <Route path="/customer/:id" element={<Customer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
