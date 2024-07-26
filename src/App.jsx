import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login";
import Register from "./routes/Register";

import { useLoginState } from "./hooks/useLoginState";
import UserProfile from "./routes/User/Profile/Profile";

import FindPal from "./routes/User/FindPal/FindPal";
import Customer from "./routes/Customer/Customer";
import CreateCustomer from "./routes/Customer/CreateCustomer";
import ManageCustomers from "./routes/Customer/ManageCustomers";
import ApproveProfiles from "./routes/Admin/ApproveProfiles";
import ApproveUpdates from "./routes/Admin/ApproveUpdates";
import AdminCustomer from "./routes/Customer/AdminCustomer";
import CheckoutForm from "./routes/Payment/Payment";

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

  // intially we used word customers for inmates
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<AdminRoutes />}>
        <Route path="/approve-profiles" element={<ApproveProfiles />} />
        <Route path="/approve-updates" element={<ApproveUpdates />} />
        <Route path="/admin/inmate-updates/:id" element={<AdminCustomer />} />
        <Route path="/admin/inmate-profile/:id" element={<Customer />} />
        <Route path="*" element={<ApproveProfiles />} />
      </Route>
      <Route element={<UserRoutes />}>
        <Route path="/" element={<FindPal />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/inmate/:id" element={<Customer />} />
        <Route path="/list-inmate" element={<CreateCustomer />} />
        <Route path="/update-inmate/:id" element={<CreateCustomer />} />
        <Route path="/manage-inmates" element={<ManageCustomers />} />
        <Route path="/payment" element={<CheckoutForm />} />
        <Route path="*" element={<FindPal />} />
      </Route>
    </Routes>
  );
}

export default App;
