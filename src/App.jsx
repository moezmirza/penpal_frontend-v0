import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login";
import Register from "./routes/Register";

import UserProfile from "./routes/User/Profile/Profile";

import FindPal from "./routes/User/FindPal/FindPal";
import Customer from "./routes/Customer/Customer";
import CreateCustomer from "./routes/Customer/CreateCustomer";
import UpdateCustomer from "./routes/Customer/CreateCustomer";
import ManageCustomers from "./routes/Customer/ManageCustomers";
import ApproveProfiles from "./routes/Admin/ApproveProfiles";
import ApproveUpdates from "./routes/Admin/ApproveUpdates";
import CustomerUpdateDetails from "./routes/Admin/CustomerUpdateDetails";
import StripeCheckout from "./routes/Payment/StripeCheckout";
import StripeResult from "./routes/Payment/StripeResult";
import UpdateCustomers from "./routes/Customer/UpdateCustomers";
import ExploreProfiles from "./routes/Customer/ExploreProfiles";
import DeleteProfiles from "./routes/Admin/DeleteProfiles";
import UpdateProfiles from "./routes/Admin/UpdateProfiles";
function App() {
  const location = useLocation()
  console.log("location in appjs", location)
  const UserRoutes = () => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    return userAuth ? <Outlet /> : <Navigate to={"/login"} state={location} />;
  };
  const AdminRoutes = () => {
    const adminAuth = JSON.parse(localStorage.getItem("adminAuth"));
    return adminAuth ? <Outlet /> : <Navigate to={"/login"} />;
  };

  // intially we used word customers for inmates
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<FindPal />} />
      <Route path="/inmate/:id" element={<Customer />} />
      <Route path="/explore-profiles" element={<ExploreProfiles />} />

      <Route element={<UserRoutes />}>
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/list-inmate" element={<CreateCustomer />} />
        <Route path="/update-inmate/:id" element={<UpdateCustomer />} />
        <Route path="/manage-inmates" element={<ManageCustomers />} />
        <Route path="/update-inmates" element={<UpdateCustomers />} />
        <Route path="/payment" element={<StripeCheckout />} />
        <Route path="/payment/result" element={<StripeResult />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>

      <Route element={<AdminRoutes />}>
        <Route path="/approve-profiles" element={<ApproveProfiles />} />
        <Route path="/approve-updates" element={<ApproveUpdates />} />
        <Route path="/admin/inmate-updates/:id" element={<Customer />} />
        <Route path="/admin/inmate/:id" element={<Customer />} />
        <Route path="/delete-profiles" element={<DeleteProfiles />} />
        <Route path="/update-profiles" element={<UpdateProfiles />} />
        <Route path="admin/create-profile" element={<CreateCustomer />}></Route>
        <Route path="/admin/update-inmate/:id" element={<UpdateCustomer />} />
        <Route path="*" element={<Navigate to="/approve-profiles" />} />
      </Route>
    </Routes>
  );
}

export default App;
