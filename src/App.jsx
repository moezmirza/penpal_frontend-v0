import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./routes/Login";
import Register from "./routes/Register";

function App() {
  return (
    <div className="">

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </div>
  );
}

export default App;
