import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login";
import Register from "./routes/Register";

import { useLoginState } from "./hooks/useLoginState";
import UserProfile from "./routes/User/Profile/Profile";

import FindPal from "./routes/User/FindPal/FindPal";
import Customer from "./routes/Customer/Customer";
import Chat from "./routes/User/Chat";
import CreateCustomer from "./routes/Customer/CreateCustomer";
import ManageCustomers from "./routes/Customer/ManageCustomers";
import ApproveProfiles from "./routes/Admin/ApproveProfiles";
import ApproveUpdates from "./routes/Admin/ApproveUpdates";
import AdminCustomer from "./routes/Customer/AdminCustomer";

function App() {
  const UserRoutes = () => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    console.log("userAuth", userAuth);
    return userAuth ? <Outlet /> : <Login />;
  };
  const AdminRoutes = () => {
    const adminAuth = JSON.parse(localStorage.getItem("adminAuth"));
    return adminAuth ? <Outlet /> : <Login />;
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<AdminRoutes />}>
        <Route path="/approve-profiles" element={<ApproveProfiles />} />
        <Route path="/approve-updates" element={<ApproveUpdates />} />
        <Route path="/admin/customer/:id" element={<AdminCustomer />} />
      </Route>
      <Route element={<UserRoutes />}>
        <Route path="/" element={<FindPal />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/customer/:id" element={<Customer />} />
        <Route path="/list-customer" element={<CreateCustomer />} />
        <Route path="/update-customer/:id" element={<CreateCustomer />} />
        <Route path="/manage-customers" element={<ManageCustomers />} />
        <Route path="*" element={<FindPal />} />
      </Route>
    </Routes>
  );
}

export default App;
