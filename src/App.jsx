import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login";
import Register from "./routes/Register";

import { useLoginState } from "./hooks/useLoginState";
import UserProfile from "./routes/User/Profile/Profile";
import { Navbar } from "./components/mainComponents/Navbar";
import FindPal from "./routes/User/FindPal/FindPal";
import Customer from "./routes/Customer/Customer";
import Chat from "./routes/User/Chat";
import CreateCustomer from "./routes/Customer/CreateCustomer";
import ManageCustomers from "./routes/Customer/ManageCustomers";

function App() {
  const AuthenticatedRoutes = () => {
    const isAuth = localStorage.getItem("auth") === "true";
    const isAdmin = localStorage.getItem("admin") === "false";
    console.log("isAuth", "isAdmin", isAuth, isAdmin);

    return isAuth && isAdmin ? <Outlet /> : <Login />;
  };
  const AdminRoutes = () => {
    const isAdmin = localStorage.getItem("admin") === "true";
    return isAdmin ? <Outlet /> : <Login />;
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<AdminRoutes />}>
        <Route path="/home" element={<FindPal />} />
      </Route>
      <Route element={<AuthenticatedRoutes />}>
        <Route path="/" element={<FindPal />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/customer/:id" element={<Customer />} />
        <Route path="/list-customer" element={<CreateCustomer />} />
        <Route path="/update-customer/:id" element={<CreateCustomer />} />
        <Route path="/manage-customers" element={<ManageCustomers />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<FindPal />} />
      </Route>
    </Routes>
  );
}

export default App;
